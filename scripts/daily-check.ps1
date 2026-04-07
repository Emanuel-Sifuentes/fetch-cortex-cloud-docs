# Daily doc freshness check for Cortex documentation
# Runs npm run check:cortex, and if changes are detected, re-fetches with --apply

$ProjectDir = "C:\Users\emanu\Repos\fetch-cortex-cloud-docs"
$LogFile = Join-Path $ProjectDir "logs\daily-check.log"

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

# Phase 1: Check for changes
$checkOutput = & npm run check:cortex -- --format text --exit-code 2>&1
$exitCode = $LASTEXITCODE

"[$timestamp] Check output:" | Add-Content $LogFile
$checkOutput | Add-Content $LogFile
$checkOutput | Write-Host

if ($exitCode -eq 2) {
    "[$timestamp] Changes detected. Running --apply..." | Tee-Object -FilePath $LogFile -Append

    try {
        Send-Toast "Cortex Docs Check" "Changes detected! Re-fetching..."
    } catch {}

    $applyOutput = & npm run check:cortex -- --apply 2>&1
    $applyExit = $LASTEXITCODE

    $applyOutput | Add-Content $LogFile
    $applyOutput | Write-Host

    $doneTimestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

    if ($applyExit -eq 0) {
        "[$doneTimestamp] Apply completed successfully." | Tee-Object -FilePath $LogFile -Append
        try {
            Send-Toast "Cortex Docs Check" "Re-fetch complete. Documentation updated."
        } catch {}
    } else {
        "[$doneTimestamp] Apply failed with exit code $applyExit." | Tee-Object -FilePath $LogFile -Append
        try {
            Send-Toast "Cortex Docs Check" "Re-fetch FAILED (exit code $applyExit). Check logs."
        } catch {}
    }
} elseif ($exitCode -eq 0) {
    "[$timestamp] No changes detected. All up to date." | Tee-Object -FilePath $LogFile -Append
    try {
        Send-Toast "Cortex Docs Check" "No changes detected. All up to date."
    } catch {}
} else {
    "[$timestamp] Check failed with exit code $exitCode." | Tee-Object -FilePath $LogFile -Append
    try {
        Send-Toast "Cortex Docs Check" "Check FAILED (exit code $exitCode). Check logs."
    } catch {}
}
