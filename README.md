# gha-kubernetes

Various GHA workflows packaged as workflow_call events.

### Automatically Updating Docs

Currently using the [action-docs](https://github.com/npalm/action-docs) CLI tool to programmatically generate README docs from `action.yaml` files.

#### Install with:

```bash
sudo yarn global add action-docs --prefix /usr/local
```

#### Update docs with:

```bash
cd <action repo>

action-docs -u -a action.yaml --no-banner
```
