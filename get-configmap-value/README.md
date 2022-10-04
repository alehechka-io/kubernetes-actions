<!-- action-docs-description -->
## Description

Retrieves a variable from a ConfigMap in Kubernetes cluster


<!-- action-docs-description -->

## Example Usage

```yaml
name: Create Feature Namespace
on:
  - pull_request

jobs:
  create-feature-namespace:
    name: Create Feature Namespace
    runs-on: ubuntu-latest

    steps:
      - name: Create Feature Namespace
        id: namespace
        uses: alehechka-io/kubernetes-actions/create-feature-namespace@main
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
```

<!-- action-docs-inputs -->
## Inputs

| parameter | description | required | default |
| - | - | - | - |
| variable | Variable in the ConfigMap "data" to retrieve | `true` |  |
| namespace | Namespace of ConfigMap | `false` | default |
| config_map | Name of ConfigMap | `true` |  |



<!-- action-docs-inputs -->

<!-- action-docs-outputs -->
## Outputs

| parameter | description |
| - | - |
| value | Value found in ConfigMap |



<!-- action-docs-outputs -->

<!-- action-docs-runs -->
## Runs

This action is a `composite` action.


<!-- action-docs-runs -->
