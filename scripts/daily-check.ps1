# Daily doc freshness check for Cortex documentation
# Runs npm run check:cortex, and if changes are detected, re-fetches with --apply

$ProjectDir = "C:\Users\emanu\Repos\fetch-cortex-cloud-docs"
$LogFile = Join-Path $ProjectDir "logs\daily-check_$(Get-Date -Format 'yyyy-MM-dd_HHmmss').log"

# Ensure log directory exists
New-Item -ItemType Directory -Force -Path (Split-Path $LogFile) | Out-Null

function Send-Toast {
    param([string]$Title, [string]$Message)
    [Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime] | Out-Null
    [Windows.Data.Xml.Dom.XmlDocument, Windows.Data.Xml.Dom.XmlDocument, ContentType = WindowsRuntime] | Out-Null

    $template = @"
<toast>
  <visual>
    <binding template="ToastText02">
      <text id="1">$Title</text>
      <text id="2">$Message</text>
    </binding>
  </visual>
</toast>
"@
    $xml = New-Object Windows.Data.Xml.Dom.XmlDocument
    $xml.LoadXml($template)
    $toast = [Windows.UI.Notifications.ToastNotification]::new($xml)
    $appId = '{1AC14E77-02E7-4E5D-B744-2EB1AE5198B7}\WindowsPowerShell\v1.0\powershell.exe'
    [Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier($appId).Show($toast)
}

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

try {
    Send-Toast "Cortex Docs Check" "Starting daily doc freshness check..."
} catch {
    # Toast notification failed — continue without it
}

"[$timestamp] Starting daily check..." | Tee-Object -FilePath $LogFile -Append

Set-Location $ProjectDir

# Single check+apply pass: --apply does the fetch when changes are found,
# --exit-code surfaces the result (0 = no changes, 2 = changes applied, 1 = error).
$output = & npm run check:cortex -- --apply --exit-code --format text 2>&1
$exitCode = $LASTEXITCODE

$output | Add-Content $LogFile
$output | Write-Host

$doneTimestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

if ($exitCode -eq 0) {
    "[$doneTimestamp] No changes detected. All up to date." | Tee-Object -FilePath $LogFile -Append
    try {
        Send-Toast "Cortex Docs Check" "No changes detected. All up to date."
    } catch {}
} elseif ($exitCode -eq 2) {
    "[$doneTimestamp] Changes detected and applied successfully." | Tee-Object -FilePath $LogFile -Append
    try {
        Send-Toast "Cortex Docs Check" "Re-fetch complete. Documentation updated."
    } catch {}
} else {
    "[$doneTimestamp] Failed with exit code $exitCode." | Tee-Object -FilePath $LogFile -Append
    try {
        Send-Toast "Cortex Docs Check" "FAILED (exit code $exitCode). Check logs."
    } catch {}
}
