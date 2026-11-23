# Zoodex end-to-end tests

Robot Framework suites for validating Zoodex web, mobile web, and Android user journeys. The repository name is `Robot-Freamwork`.

| Area | What the suites exercise |
| --- | --- |
| Web and mobile web | Search, vendor selection, location, filters, and order flows. |
| Android | Appium flows using an Android emulator or test device. |
| Shared resources | Common keywords and environment variables keep repeated setup out of individual suites. |

## Set up a test environment

Use a Python virtual environment. Install the listed libraries plus SeleniumLibrary, which is imported by the Selenium web suite. For Browser-library suites, also install Node.js and initialize their browser support. Android suites need an Appium server with the Android driver and a connected test device or emulator.

```sh
python -m pip install -r requirements.txt robotframework-seleniumlibrary
rfbrowser init
```

Review `variables/env_vars.robot` and `variables/pub_variables.robot` to determine which settings your chosen suite needs. Configure an authorized test deployment and a dedicated test account; some flows can change account data or submit an order.

Run a Robot Framework dry run first to verify keyword resolution:

```sh
robot --dryrun --outputdir results tests/e2e_zoodex_web.robot
```

After configuring the test deployment, remove `--dryrun` to execute the suite. Robot Framework writes its report, log, and XML output into `results/`.

## Layout

- `tests/e2e_*.robot`: main entry points for the supported targets.
- `tests/walk flows/`: smaller journeys such as search, login, favorites, cart, and location.
- `resources/` and `variables/`: shared keywords and test configuration.
