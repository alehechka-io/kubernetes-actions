<!-- action-docs-description -->
## Description

Will retrieve the acting ref name regardless of trigger


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
| custom_ref | Custom Ref Name Override | `false` |  |



<!-- action-docs-inputs -->

<!-- action-docs-outputs -->
## Outputs

| parameter | description |
| - | - |
| name | Ref Name of triggering ref |



<!-- action-docs-outputs -->

<!-- action-docs-runs -->
## Runs

This action is a `composite` action.


<!-- action-docs-runs -->
