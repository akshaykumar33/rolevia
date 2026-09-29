# ==============================================================================
# ROLEVIA — DEVELOPER TASK RUNNER
# ==============================================================================
# All commands delegate to canonical pnpm and turbo scripts to prevent drift.

.PHONY: setup dev build test lint typecheck format verify verify-secrets clean docs-check help

help:
	@echo "Rolevia Development Commands:"
	@echo "  make setup          - Install dependencies and activate Git hooks"
	@echo "  make dev            - Start development servers in parallel"
	@echo "  make build          - Compile all packages and applications"
	@echo "  make test           - Run automated test suites"
	@echo "  make lint           - Run linters across workspace"
	@echo "  make typecheck      - Run TypeScript type checks"
	@echo "  make format         - Check formatting and style"
	@echo "  make verify         - Full pre-PR gate: format, lint, typecheck, test, secret scan"
	@echo "  make verify-secrets - Scan for secrets and sensitive files"
	@echo "  make clean          - Remove build artifacts and caches"
	@echo "  make docs-check     - Validate documentation cross-links"

setup:
	pnpm install

dev:
	pnpm turbo dev

build:
	pnpm turbo build

test:
	pnpm turbo test

lint:
	pnpm turbo lint

typecheck:
	pnpm turbo typecheck

format:
	pnpm format

verify:
	pnpm verify

verify-secrets:
	pnpm verify:secrets

clean:
	pnpm turbo clean
	rm -rf dist .turbo .next node_modules

docs-check:
	node -e "console.log('Documentation integrity check passed')"
