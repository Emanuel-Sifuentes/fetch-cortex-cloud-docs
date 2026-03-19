# Cortex Cloud Data Classification

## What is Cortex Cloud Data Classification?

Overview of the Data Classification engine.

To access Data Classification management, click Settings → Configurations → Data Classification .

The main screens of Data Classification management are:

-   Data Patterns: Types of data that are discoverable on a data object, such as credit card numbers, social security numbers (SSNs), and email addresses. Cortex Cloud Data Classification provides a complete list of hundreds of out-of-the-box patterns. Scroll to the right to see more information about each pattern (description, region and state location, whether enabled). You can disable the data patterns that are not relevant for you. For more information, see How to disable and enable data patterns in Data Classification.
    
-   Data Profiles: A data profile defines a data-related business case and is applied to a data object such as a file or field. Six major data profiles are included out-of-the-box:
    
    -   **Developer Secrets**: Sensitive pieces of information, such as API keys, passwords, tokens, and other credentials, that are used to authenticate and access various resources, services, and APIs. These secrets play a crucial role in securing applications and systems by validating the identity and permissions of users or applications.
        
    -   **Financial**: A collection of information and data related to an individual or an organization's financial status, transactions, investments, assets, liabilities, income, expenses, and other financial activities. This profile includes details such as bank account information, credit card details, investment portfolios, income statements, tax returns, and any other financial records that provide a comprehensive view of a person or entity's financial health and behavior.
        
    -   **PCI**: A set of information and data related to Payment Card Industry (PCI) compliance requirements and standards. This profile includes details such as credit card numbers, expiration dates, security codes (CVV/CVC), and any other data associated with processing payment transactions securely and in accordance with PCI Data Security Standards (PCI DSS).
        
    -   **PHI**: A collection of information and data related to Protected Health Information (PHI), which includes sensitive and confidential health-related data about individuals. This profile may contain details such as health insurance information, patient identifiers, HIPAA related identifiers, ICD identifiers, and any other data that can be used to identify or link to an individual's health condition.
        
    -   **PII**: Personally Identifiable Information (PII), which includes any data that can be used to identify or distinguish an individual uniquely. This profile may contain information such as full names, home addresses, email addresses, phone numbers, social security numbers, driver's license numbers, passport numbers, and other personal identifiers that can be linked to a specific person.
        
    -   **Sensitive**: A broad range of information that is considered confidential, proprietary, or personally sensitive. This profile may include various types of data that we did not use to classify any other profile, such as internal IP addresses, internal classless inter-domain routing (CIDR), IP addresses, license plate numbers, MAC addresses, passwords, political views, religious beliefs, or SIM card numbers (ICCID).
        
    
-   Global Settings: By default, both the OCR scan and Collect Masked Patterns are relevant for all modules that are using data classification. In other words, these two settings are global and define the behavior of OCR and sample collection for all modules using data classification.
    
    -   OCR (Optical Character Recognition): Enabled by default. When enabled, OCR extracts text from images. Disabling this option reduces scanning time but does not cover image classification.
        
    -   Collect Masked Patterns: Collects three samples for each data pattern that was classified in each object (file or table) and is masked by the Data Classification engine in your environment. Data does not leave your environment before it is masked, therefore the full data is always protected.

## How to create and validate a custom data pattern

Learn how to use Cortex Cloud Data Classification to define specific criteria for identifying sensitive data for your unique needs.

### Overview

Custom data patterns allow you to define specific criteria for identifying sensitive data tailored to your organization's unique requirements. These patterns are applied globally across all modules that utilize Cortex Cloud Data Classification.

### Parameters and definitions

To create a new custom data pattern, you will need to use the following parameters:

| Parameter | Definition |
| --- | --- |
| regex | Define your pattern using regular expressions that are compatible with Rust syntax. |
| context words | Specify keywords that should appear in proximity to the regex match. These words are included in the search. A context word can be just one word or a phrase of a few words. Separate the context words or phrases with a comma (,). |
| proximity | Define a proximity for each custom data pattern. The proximity parameter defines the maximum number of characters allowed between the context words and a regex match. The proximity parameter finds regex values only after the context word. |
| masking level | Define a specific masking level for each custom data pattern you create. Any changes to this setting only affect future data collection. The possible masking level options are: **Mask all:** Displays only the number of strings with asterisks (\*).; **Partial:** Partial masking hides the last 70% of the value. Only alphanumeric characters are masked. |
| profile association | You can associate your custom data pattern with one or more custom data profiles. This allows the pattern to be included in the definition of a data profile. |

### Create a new custom data pattern

1.  In the lower left part of the screen, click Settings → Configurations.
    
2.  In the Configurations column, under Data Classification, click Data Patterns.
    
3.  On the Data Patterns screen, click \+ Add Pattern.
    
4.  On the Create New Data Pattern screen, do the following (the starred fields are mandatory):
    
    1.  In the Data Pattern Name field, enter a data pattern name. To add an optional description, click Add description and enter a description in the text box that opens. If you change your mind and want to remove it, click Remove description.
        
    2.  In the Regular Expression (Regex) field, enter a regex.
        
    3.  In the Context Words line, enter the context words you want to use for your new data pattern.
        
    4.  In the Proximity field, enter an integer that is greater than 10 and less than 150. The proximity is the maximum distance in characters from the context word to a regex value. If a context word is found, the proximity is counted from the end of the context word. The entire regex value must be found within this proximity window to be considered as found.
        
    
5.  You can now test your new data pattern to validate it.
    

For information about guardrails and syntax for custom data patterns, see Custom data patterns: Guardrails and syntax guide.

**Note:**

Once a custom data pattern is saved, it runs on all data in the same way as any out-of-the-box (OOTB) pattern, becoming globally applicable for all modules using Cortex Cloud Data Classification.

### Validate the data pattern

It is crucial to validate your custom data pattern before saving it to ensure that it functions as intended and does not negatively impact system performance.

Validation does the following:

-   Helps you understand if your custom classifier is properly defined in order to capture the data that you require. If it is not properly defined, the validator provides insights into the problem and assists with modifications.
    
-   Verifies that the custom pattern does not cause the classification engine to get stuck or work slowly, which could affect functionality or the user experience.
    

To validate your data pattern, do the following:

1.  In the Test Data Pattern text box, enter your test text and click Test. Based on your configured regex value, any matches that are found appear in the test results box and are highlighted.
    
2.  You can adjust your regex value and click Test again to get different results.
    

### Validator behavior and results

-   **Check regex:**
    
    -   A text that is found by regex appears with highlighting.
        
    -   If the regex text is found within the defined proximity range, it is highlighted in green, even if only one text is found within the correct proximity of a context word.
        
    -   If the text is found outside of the defined proximity range for all context words, it is highlighted in gray.
        
    
-   **Check context words:**
    
    -   Texts that are found under different context words are underlined.
        
    -   If a text is found within the proximity range, it is highlighted in green.
        
    -   If a text is found outside the proximity range, it is highlighted in gray.
        
    
-   **Textual explanation and guidance:** The checker provides messages based on the test results.
    
-   **Sanity check (performance):** A critical check runs automatically when you click Save for your custom pattern, even if you don't manually run the data pattern check.
    
    -   If a regex fails the sanity check, a notification informs you that the regex is too broad and needs to be narrowed.
        
    -   You cannot save a custom classifier until its regex passes this performance test.
        
    

### Manage custom data patterns

-   **Delete custom data patterns:** You can delete custom data patterns. Be aware that deleting a data pattern erases all past data associated with it in each module using Cortex Cloud Data Classification. It can take up to two days for data deletion process to be completed in all places where this custom data pattern exists.
    
-   **Attach Geo tags to patterns:** You can attach Geo tags to each pattern, to help filter or view information based on specific locations. These tags can be added or removed only from custom patterns.
    
-   **Enable or disable a data pattern:** You can enable or disable a data pattern. This action is global and applies to all modules using Cortex Cloud Data Classification. Enabling or disabling only affects future scans; past results are still presented.
    

**Note:**

For more information, see How to disable and enable data patterns in Data Classification.How to disable and enable data patterns in Data Classification

### Custom data patterns: Guardrails and syntax guide

Details and examples about the capabilities and limitations with regular expressions in Cortex Cloud Data Classification.

This guide explains the capabilities and limitations of creating custom classifiers. Understanding these guardrails will help you create effective and functional data patterns.

#### Guardrails

This section details the configuration rules, the logic behind these requirements, and how they affect pattern detection.

##### One regex per detector

-   **Rule:** Each custom detector supports a single regular expression.
    
-   **Why:** This simplifies the configuration and ensures that each detector has a clear, singular purpose.
    
-   **Impact:** If you need to match multiple different patterns (for example, different formats of an ID), you need to create separate custom detectors for each pattern or combine them into a single regex using the alternation operator | (pipe), provided that this does not violate complexity limits. Example: `format1|format2`
    

##### Context words are mandatory

-   **Rule:** You must provide at least one context word for your classifier.
    
-   **Why:** The Data Classification engine uses context words as a first-pass filter. It only runs your potentially regular expression (regex) if one of the context words is found in the proximity you defined. This ensures high performance across large datasets.
    
-   **Impact:** If you don't provide context words, or if the context words don't appear near your target data, the regex does not execute, and no match is found.
    

##### Avoid start-of-string and end-of-string anchors (^ and $)

-   **Rule:** Do not use the start-of string and end-of-string `^` or `$` anchors.
    
-   **Why:** In many regex engines, `^` and `$` match the start or end of a line. However, in Cortex Cloud Data Classification, they match the start or end of the entire text being scanned. Since your target data ( such as an ID or key) is usually embedded in the middle of a file or sentence, using these causes the match to fail.
    
-   **Impact:**
    
    -   `^[A-Z]{2}\d{5}` fails to find "AB12345".
        
    -   `[A-Z]{2}\d{5}$` fails to find "AB12345".
        
    

##### Avoid using lookaround and backreference entities

-   **Rule:** Cortex Cloud Data Classification does not support the following:
    
    -   **lookahead** `((?=...))`
        
    -   **lookbehind** `((?&lt;=...))`
        
    -   **backreference** `(\1)`
        
    
-   **Why:** Using the `lookaround` and `backreference` entities can lead to exponential execution time. Cortex Cloud Data Classification allows `lookaround` entities using the context words, and it uses the Rust regex engine, which guarantees linear time execution `O(n)` to prevent ReDoS (Regular Expression Denial of Service) attacks and to ensure predictable performance.
    
-   **Impact:** You must rewrite patterns to avoid these constructs. For example, instead of using `lookbehind` to ensure that a prefix exists, include the prefix in the match and use a capturing group for the data you want to extract.
    

##### Regex complexity limits

-   **Rule:** Cortex Cloud Data Classification enforces limits on regex complexity to prevent performance issues.
    
    -   **Unbound repetitions:** If possible, avoid unbounded repetitions such as `.*` or `.+` or ensure that they are not nested.
        
    -   **Nesting depth:** Deeply nested patterns, such as `((((a)b)c)d))`, are limited.
        
    -   **Branching:** Too many alternations (such as `a|b|c|...`) or nested alternations can trigger validation errors.
        
    
-   **Why:** Complex patterns with excessive nesting or branching can lead to "combinatorial explosion," where the number of possible matches grows exponentially, causing the scanner to hang or crash.
    
-   **Impact:** If your regex is too complex, Cortex Cloud Data Classification rejects it with a validation error. In short, simplify your pattern by reducing nesting or breaking it into smaller components.
    

#### Syntax: Supported vs. unsupported

This section lists the specific regular expression characters and groupings that are allowed or restricted for use in custom patterns.

-   **Supported syntax**
    
    -   **Character classes**: `[a-z], [0-9], \d, \w, \s`
        
    -   **Groupings**:
        
        -   **Capturing**: `(...)`
            
        -   **Noncapturing**: `(?:...)`
            
        
    -   **Alternation**: Pipe `|` (OR operator). Example: `cat|dog`
        
    -   **Case insensitivity**: `(?i)` flag. Example: `(?i)pattern` matches "Pattern", "PATTERN", and so on.
        
    
-   **Unsupported syntax**
    
    -   **lookahead**: `(?=...), (?!...)`
        
    -   **lookbehind**: `(?&lt;=...), (?&lt;!...)`
        
    -   **backreference**: `\1, \2`
        
    

#### Examples: Do's and don'ts

##### Example 1: Matching an ID (anchors)

**Goal**: Match an ID that starts with 2 letters followed by 5 digits (such as "XY12345").

-   **Do**: `[a-zA-Z]{2}\d{5}`
    
    Reason: This allows the pattern to match anywhere in the text.
    
-   **Don't**: `^[a-zA-Z]{2}\d{5}` or `[a-zA-Z]{2}\d{5}$`
    
    Reason: The `^` and `$` anchors force the match to be at the start or end of the entire file. However, it misses IDs inside a sentence or JSON object.
    

##### Example 2: Case insensitivity

**Goal**: Match the word "Confidential" regardless of case.

-   **Do**: `(?i)confidential`
    
    Reason: The `(?i)` flag enables case-insensitive matching for the pattern.
    
-   **Don't**: `[C|c][O|o][N|n]...`
    
    Reason: This is inefficient and hard to read.
    

##### Example 3: Testing your pattern

**Goal**: Verify that your pattern works in the Test Data Pattern box.

-   **Do**: If a test fails, clear the Test Data Pattern box completely and retype or paste the test string.
    
    Reason: This ensures that the test environment resets to a stateless condition before processing the new input.
    
-   **Don't**: Edit the existing text in the test box and expect immediate results if previous tests failed.

## How to disable and enable data patterns in Data Classification

How to turn data patterns on and off in Data Classification.

### Disable data patterns

You can disable data patterns that you do not require. Disabled data patterns are not searched for in new scans. Existing results on past scans do not change.

**Note:**

Disabling data patterns can cause changes in your data profile results and stop detection of these data patterns.

1.  In the lower left part of the screen, click Settings → Configurations → Data Classification → Data Patterns.
    
2.  Right-click the rows of the data patterns you want to disable, and in the context menu, select Disable.
    
3.  In the Disable Data Pattern screen, click Yes to disable the data pattern or patterns that you selected, or click No to cancel. If you click Yes, the data pattern will be disabled and appear grayed out. You can enable it again if required, as described below.
    

### Enable data patterns

You can enable data patterns after they have been disabled. Once enabled, new scans classify these data patterns and the results are then visible in all relevant modules.

1.  Right-click the rows of the disabled data patterns that you want to enable, and in the context menu, click Enable.
    
2.  In the Enable Data Pattern screen, click Yes to enable the data pattern or patterns that you selected, or click No to cancel.
    

**Note:**

For more information about data patterns in data classification, see What is Cortex Cloud Data Classification?.

## How to create and validate a custom data profile

Learn how to use custom data profiles in Cortex Cloud Data Classification, which are labels that are applied to a data object and define a data-related business case.

### Overview

A data profile is a label which is applied to a data object such as a file or table and defines a data-related business case.

Data profiles are a fundamental component of your organization's data security strategy, serving as the vehicle that defines what is considered sensitive data. Data profiles specifically outline the sensitive data your organization aims to discover, monitor, or receive alerts about. Profiles can be applied to and calculated for various data sources, including files, tables, and text-based information such as API calls.

You can create data profiles to customize sensitive data definitions according to your requirements, complementing or extending the predefined out-of-the-box (OOTB) profiles.

### Understand custom data profiles

Unlike OOTB profiles, which are fixed lists and cannot be edited or erased, custom data profiles offer full flexibility: they can be edited, duplicated, deleted, disabled, or enabled. This means you can either build a custom profile from scratch, or start by duplicating an existing OOTB profile and then modifying it. When you duplicate an OOTB profile, the system initially assigns it a name "copy of X," but you can rename it as required.

### Create a new custom data profile

When creating a custom data profile, you need to define various parameters that specify what constitutes sensitive data.

1.  In the lower left part of the screen, click Settings → Configurations.
    
2.  In the Configurations column, under Data Classification, click Data Profiles.
    
3.  On the Data Profiles screen, click \+ Add Profile.
    
4.  On the Create New Data Profile screen, do the following:
    
    1.  In the Data Profile Name field, specify a data profile name. To add an optional description, click Add description and enter a description in the text box that opens. If you change your mind and want to remove it, click Remove description.
        
    2.  Under Select Data Location, select the locations that you want to assign to your new data profile:
        
        -   **Cloud**: includes a variety of parameters.
            
        -   **Endpoints**: Includes only data patterns.
            
        -   **APIs:** Includes only data patterns.
            
        
    3.  Under Set Conditions, select the filters you want to set for your new data profile.
        
        -   **Cloud**: Includes a variety of filters.
            
        -   **Endpoints**: Includes only data patterns.
            
        -   **APIs**: Includes only data patterns.
            
        
    
    **Note:**
    
    If you choose two data locations, only the filters they have in common will be included in the possible filter options.
    
5.  Click Create.
    
    The new custom data profile now appears in the Data Profiles list.
    

### Manage custom data profiles

You can manage custom data profiles as follows:

-   **Edit:** You can fully edit any custom profile.
    
-   **Duplicate:** All custom profiles can be duplicated using the context menu in the Data Profiles list.
    
-   **Delete:** Only custom data profiles can be deleted using the context menu in the Data Profiles list.
    
    **Important:**
    
    Deleting a data profile deletes all past data associated with it in all modules using Cortex Cloud Data Classification after a warning notification is displayed.
    
-   **Enable or Disable:** You can enable or disable any data profile, custom or OOOB.
    
    **Important:**
    
    Enabling and disabling a data profile removes or re-adds the data profile results to the data objects; that is, files and tables.
    

### Enable and disable data profiles

**Note:**

For more information, see How to disable and enable data profiles in Cortex Cloud Data Classification.

## How to disable and enable data profiles in Cortex Cloud Data Classification

How to turn data profiles on and off in Cortex Cloud Data Classification.

### Understand data profile statuses

Data profiles define what constitutes sensitive data for your organization and are applicable to both files and tables. You have the flexibility to enable or disable both out-of-the-box (OOTB) and custom data profiles.

-   **Enabled:** When a data profile is enabled, Cortex Cloud Data Classification actively applies its definitions to identify sensitive data.
    
-   **Disabled:** When a data profile is disabled, all data profile results are removed from the object; that is, file or table.
    

**Note:**

Existing results on past scans are updated in the Asset and Object inventories within two hours after being disabled or enabled.

### Disable data profiles

You can disable data profiles that you do not require. Disabled data profiles are not searched for in new scans. Existing results on past scans are updated in the Asset and Object inventories within two hours after being disabled or enabled.

1.  In the lower left part of the screen, click Settings → Configurations → Data Classification → Data Profiles.
    
2.  Right-click the rows of the data profiles you want to disable, and in the context menu, select Disable.
    
3.  In the Disable Data Profile screen, click Yes to disable the data profile or profiles that you selected, or click No to cancel. If you click Yes, the data profile will be disabled and appear grayed out. You can enable it again if required, as described below.
    

### Enable data profiles

You can enable data profiles after they have been disabled. Once enabled, within two hours, the profiles are recalculated on the existing data in the Asset and Object inventories. After the new scans calculate these data profiles, the results are then visible in all relevant modules.

1.  Right-click the rows of the disabled data profiles that you want to enable, and in the context menu, click Enable.
    
2.  In the Enable Data Profile screen, click Yes to enable the data profile or profiles that you selected, or click No to cancel.
    

**Note:**

For more information about data profiles in Cortex Cloud Data Classification, see What is Cortex Cloud Data Classification?.What is Cortex Cloud Data Classification?

### Important considerations

-   **Global impact of built-in data profiles**: You can only enable or disable them.
    
-   **Flexibility for custom profiles:** You can do the following with custom data profiles, including those you have duplicated from built-in data profiles:
    
    -   Edit
        
    -   Duplicate
        
    -   Delete
        
    -   Disable
        
    -   Enable

## How to report a false positive in Cortex Cloud Data Classification

Details about the procedure for creating a support case for a false positive result in Cortex Cloud Data Classification.

### Overview

When reviewing a scan of your assets, if you notice or identify that a data object (such as a file, table, or field) has been incorrectly classified, you can use the provided support case submission feature to report the false positive.

You initiate a support case submission using the designated Report false positive button. This triggers a structured workflow designed to gather all the necessary technical and contextual information required for our data analysts to investigate and fix the issue quickly. You will be asked to confirm or provide essential details, including the specific Data Pattern that was incorrectly matched and your description and evidence (a screenshot or the actual file or text) explaining why it is a false positive.

Once submitted, this case is handled by the Palo Alto Networks support team, which checks all the requested information that you provided. The support team is engaged with both the Data Engineering team to investigate and fix the issue, and with you to provide updates on the progress of the support case. The fix is applied to the core classification logic. You will be able to see accurate results after the next scan occurs.

How to create a support case

1.  You will need your tenant details during the reporting process. To display your tenant details, on the lower left screen, click Your name → About. You can take a screenshot and save the file for a later step in the reporting process. Alternatively, you can click the Copy to clipboard link to copy the information and then paste it into a file of your choice.
    
2.  On the screen where you found the false positive, click the **More Options** icon, and then click **Report false positive**.
    
    **Note:**
    
    Alternatively, in Cortex Command Center, click Help → Submit a Support Case.
    
3.  On the Submit Support Case screen that opens, on the Case Information tab, do the following:
    
    1.  In the Describe the issue text box, enter a description of the object that you are reporting.
        
    2.  Under Enter your preferred contact number, enter either your telephone or cellphone number at your organization.
        
    3.  (Optional) Under Issue frequency, select a frequency in the list. The options are Not applicable, Consistent, or Intermittent.
        
    4.  (Optional) Under Most recent issue start date & time, select the date and time that you found the false positive.
        
    5.  In the Indicate the impact of the issue list, select the one of the five options that most closely relates to your issue.
        
    6.  In the Select an issue category list, select Modules.
        
    7.  In the Problem concentration list, select Data Classification.
        
    8.  Provide the Data Pattern name where you found the false positive.
        
    9.  Under the question Does the object with the false positive contain test data or production data?, enter test data or production data.
        
    10.  If you are reporting a file, enter the file path. If it is a table, enter the column name and column type.
         
    11.  Use the Browse link to upload the file containing the false positive or a relevant screenshot that shows the false positive in context, such as the paragraph where it is located.
         
    12.  Use the Browse link to upload the file with your tenant details that you saved in step 1.
         
    13.  Select the checkbox allowing Palo Alto Networks' support team to access your CSP account.
         
    14.  Click Next.
         
    15.  On the Console Recording tab, do not create a recording. Simply click Submit Support Case.
         
4.  Click Submit. A support case is opened and you will be contacted by the Palo Alto Networks support team.
