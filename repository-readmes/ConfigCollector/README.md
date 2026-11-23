# ConfigCollector

A Python utility that collects connection configuration links from configured feeds and Telegram channels, normalizes and deduplicates them, and writes subscription lists.

## How it works

1. Read configured feeds and, when credentials are available, Telegram messages.
2. Recognize supported link formats in plain text and Base64 data. The Telegram collector also checks message buttons and can extract text from images through OCR.
3. Cap the candidate pool and validate supported VLESS and VMess entries through Xray.
4. Write the full and ranked subscription lists as `subscription.txt` and `subscription_top100.txt`.

## Setup

Use Python 3 and install the repository dependencies in a virtual environment:

```sh
python -m venv .venv
python -m pip install -r requirements.txt
```

Activate `.venv` before installing or running. The Xray checks require the `xray` executable on PATH; OCR requires Tesseract when processing images.

| Setting | Purpose |
| --- | --- |
| `SOURCE_SUBSCRIPTION_URLS` | Override the configured external source list. |
| `CHANNEL_USERNAMES` | Telegram channel list for the Telegram collector. |
| `API_ID`, `API_HASH`, `SESSION_STRING` | Telegram credentials for the Telegram collector. Keep these outside the repository. |
| `MAX_SOURCE_CANDIDATES`, `SOURCE_FETCH_TIMEOUT` | Bound feed parsing and fetching. |
| `CONFIG_TEST_TIMEOUT`, `MAX_CONCURRENT_TESTS`, `TOP_CONFIGS` | Tune validation and the size of the ranked output. |

Use sources and endpoints that you manage or have permission to test. The main command makes network requests to configured sources and eligible endpoints.

```sh
python main.py
python -m unittest -v test_main
```

The tests cover source overrides, plain and Base64 parsing, deduplication, candidate limits, and supported validation schemes.
