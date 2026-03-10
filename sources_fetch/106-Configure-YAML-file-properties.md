---
title: "Configure YAML file properties"
tocId: "QwzTdNC91dnnqM8TV9PXAw"
contentId: "js8_RtBXgZ9OCXoconFjng"
prettyUrl: "/r/Cortex-Cloud-Posture-Management/Cortex-Cloud-Application-Security/Configure-YAML-file-properties"
depth: 2
---

# Configure YAML file properties
You can leverage YAML templates to create complex rules tailored to specific compliance or security requirements. Cortex Cloud Application Security rules support attribute-based and connection-state rules.

## Rule attributes properties (YAML)

The following YAML attributes are used to define the properties of the rules.

-   provider: Specifies the cloud provider or source for the resources
    
-   definition: Contains the logic and conditions for the rule, including attributes, operators, and resource connections
    
-   resource_type: Defines the type of the specific cloud resource
    
-   cond_type: Represents the condition type for applying the rule. Options: attributes, connection, filter, resource
    
-   attribute: Refers to the specific attribute or property of the cloud resource being evaluated
    
-   value: Represents the value that the attribute of the cloud resource should meet for the rule condition
    

## Attribute-based rules

Attributes define resource property configurations. The YAML syntax for attribute configurations aligns with the framework targeted by the rule, such as Terraform, to define the desired resource state. Cortex Cloud Application Security IaC rules identify and flag any resource that deviates from this defined state as a violation.

Each resource must include one of the following conditions:

-   **Contain the specified attribute values**. For example, if a rule states that the `region` attribute must be `us-west-2`, then a resource will only pass this part of the rule if it includes the `region` attribute, and the value of that attribute is `us-west-2`
    
-   **Match the attribute's presence**. For example, if a rule states "the `encryptionEnabled` attribute must be present," then a resource will only pass if it includes the `encryptionEnabled` attribute, regardless of its value
    
-   **Match the attribute's absence**: For example, if a rule says "the `publicAccessAllowed` attribute must be absent," then a resource will only pass if it does not include the `publicAccessAllowed` attribute
    

Example 11. EXAMPLE

In this example, the attribute check flags any `aws_redshift_cluster` resource where the `automated_snapshot_retention_period` is not `0`.

```
definition:
     cond_type: "attribute"
     resource_types:
     - "aws_redshift_cluster"
     attribute: "automated_snapshot_retention_period"
     operator: "not_equals"
     value: "0"
```

  

**Supported Operators**: Attribute operators apply differently based on the scan type:

-   For `IaC` scans: All attribute operators are supported
    
-   For `Secrets` scans: You must implicitly use the `regex` operator. Even if `regex` is not explicitly defined, pattern matching is applied automatically. For example, in the following secret rule, regex is implicitly applied:
    
    ```
    cond_type: "secrets"
     value:
       - "\[A-Za-z0-9\]{8,20}"
       - "my-super-secret-password-regex"
    ```
    

The table below explains how to use attributes with matching keys and values.

| Operators | Values |
| --- | --- |
| `Equals` | `equals` |
| `Not Equals` | `not_equals` |
| `Regex Match` | `regex_match` |
| `Not Regex Match` | `not_regex_match` |
| `Exists` | `exists` |
| `Not Exists` | `not_exists` |
| `One Exists` | `one_exists` |
| `Any` | `any` |
| `Contains` | `contains` |
| `Not Contains` | `not_contains` |
| `Within` | `within` |
| `Starts With` | `starting_with` |
| `Not Starts With` | `not_starting_with` |
| `Ends With` | `ending_with` |
| `Not Ends With` | `not_ending_with` |
| `Greater Than` | `greater_than` |
| `Greater Than Or Equal` | `greater_than_or_equal` |
| `Less Than` | `less_than` |
| `Less Than Or Equal` | `less_than_or_equal` |
| `Subset` | `subset` |
| `Not Subset` | `not_subset` |
| `Intersects` | `intersects` |
| `Not Intersects` | `not_intersects` |

### Limitation of nesting in `NOT` blocks

Nesting connection condition types within a `NOT` block is not currently supported. The following example displays an unsupported 'NOT' block for connection condition types.

Example 12. 

```
definition:
  not:
    cond_type: "connection"
    resource_types:
      - "aws_elb"
    connected_resource_types:
      - "aws_security_group"
    operator: "exists"
```

  

### Using JSONPath with operators

Operators within this system support advanced attribute targeting through _JSONPath_ expressions. To apply an operator to a JSONPath result, prefix the operator with `jsonpath_`. This allows for flexible and precise data extraction and comparison. For example: `jsonpath_length_equals` or `jsonpath_length_exists` .

## Connection-based rules

Connection state in a rule defines whether resources of different types are connected or disconnected. This helps enforce security controls and architectural constraints by specifying allowed or prohibited relationships between resources.

Example 13. EXAMPLE

In this example, `aws_lb` and `aws_elb` must be connected to `aws_security_group` or `aws_default_security_group` to be compliant.

```
definition:
       cond_type: "connection"
       resource_types:
           - "aws_elb"
           - "aws_lb"
       connected_resource_types:
         - "aws_security_group"
         - "aws_default_security_group"
       operator: "exists"
```

  

The table below explains how to use Connection State types with matching keys and values.

| Key | Type | Value |
| --- | --- | --- |
| `cond_type` | string | A connection must exist between the specified resources |
| `resource_type` | collection of strings | Use either `all` or \[included resource type from list\] |
| `connected_resource_types` | collection of strings | Use either `all` or \[included resource type from list\] |
| `operator` | string | `exists`/`not exists` |

The table below explains how to use Connection State operators:

| Connection State Operators | Value |
| --- | --- |
| Exists | exists |
| Not Exists | not_exists |

## Logical operators (AND/OR)

A rule can include layers of defined attributes, connection state, or both. To define the relationship between them, use `AND`/`OR` logical operators. You can customize the attributes, connection state, or both across multiple layers.

Example 14.  

In this example, the attribute property is evaluated using `OR` logic to enforce compliance checks for ensuring all AWS databases have a backup policy.

Read more...

```
metadata:
 name: "Ensure all AWS databases have Backup Policy"
 guidelines: "In case of non-compliant resource - add a backup policy configuration for the resource"
 category: "storage"
 severity: "medium"
scope:
  provider: "aws"
definition:
 or:
   - cond_type: "attribute"
     resource_types:
     - "aws_rds_cluster"
     - "aws_db_instance"
     attribute: "backup_retention_period"
     operator: "not_exists"
   - cond_type: "attribute"
     resource_types:
     - "aws_rds_cluster"
     - "aws_db_instance"
     attribute: "backup_retention_period"
     operator: "not_equals"
     value: "0"
   - cond_type: "attribute"
     resource_types:
     - "aws_redshift_cluster"
     attribute: "automated_snapshot_retention_period"
     operator: "not_equals"
     value: "0"
   - cond_type: "attribute"
     resource_types:
     - "aws_dynamodb_table"
     attribute: "point_in_time_recovery"
     operator: "not_equals"
     value: "false"
   - cond_type: "attribute"
     resource_types:
     - "aws_dynamodb_table"
     attribute: "point_in_time_recovery"
     operator: "exists"
```

  

Example 15.  

In this example, both `AND`/`OR` logical operators are utilized to evaluate both attribute and connection state properties in order to enforce compliance checks for ensuring that all Application Load Balancers (ALBs) are only connected to HTTPS listeners.

Read more...

```
metadata:
  name: "Ensure all ALBs are connected only to HTTPS listeners"
  guidelines: "In case of non-compliant resource - change the definition of the listener/listener_rul protocol value into HTTPS"
  category: "networking"
  severity: "high"
scope:
  provider: "aws"
definition:
  and:
  - cond_type: "filter"
    value:
    - "aws_lb"
    attribute: "resource_type"
    operator: "within"
  - cond_type: "attribute"
    resource_types:
    - "aws_lb"
    attribute: "load_balancer_type"
    operator: "equals"
    value: "application"
  - or:
    - cond_type: "connection"
      resource_types:
      - "aws_lb"
      connected_resource_types:
      - "aws_lb_listener"
      operator: "not_exists"
    - and:
      - cond_type: "connection"
        resource_types:
        - "aws_lb"
        connected_resource_types:
        - "aws_lb_listener"
        operator: "exists"
      - cond_type: "attribute"
        resource_types:
        - "aws_lb_listener"
        attribute: "certificate_arn"
        operator: "exists"
      - cond_type: "attribute"
        resource_types:
        - "aws_lb_listener"
        attribute: "ssl_policy"
        operator: "exists"
      - cond_type: "attribute"
        resource_types:
        - "aws_lb_listener"
        attribute: "protocol"
        operator: "equals"
        value: "HTTPS"
      - or:
        - cond_type: "attribute"
          resource_types:
          - "aws_lb_listener"
          attribute: "default_action.redirect.protocol"
          operator: "equals"
          value: "HTTPS"
        - cond_type: "attribute"
          resource_types:
          - "aws_lb_listener"
          attribute: "default_action.redirect.protocol"
          operator: "not_exists"
      - or:
        - cond_type: "connection"
          resource_types:
          - "aws_lb_listener_rule"
          connected_resource_types:
          - "aws_lb_listener"
          operator: "not_exists"
        - and:
          - cond_type: "connection"
            resource_types:
            - "aws_lb_listener_rule"
            connected_resource_types:
            - "aws_lb_listener"
            operator: "exists"
          - or:
            - cond_type: "attribute"
              resource_types:
              - "aws_lb_listener_rule"
              attribute: "default_action.redirect.protocol"
              operator: "equals"
              value: "HTTPS"
            - cond_type: "attribute"
              resource_types:
              - "aws_lb_listener_rule"
              attribute: "default_action.redirect.protocol"
              operator: "not_exists"
```

  

Example 16.  

In this example, `OR` logic is applied to custom secrets defined as part of a policy aiming to enforce security measures by restricting the addition of certain types of secrets.

Read more...

```
metadata:
  name: "My Secret"
  guidelines: "Don't add secrets"
  category: "secrets"
  severity: "high"
definition:
  cond_type: "secrets"
  value:
    - "\[A-Za-z0-9\]{8,}"
    - "my-super-secret-password-regex"
```