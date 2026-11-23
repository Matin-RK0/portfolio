# Flutter Login UI

A Flutter UI experiment that demonstrates screen layout, input fields, and theme styling. The screen is a frontend prototype; the repository does not include an authentication service.

## Run locally

Use Flutter with Dart 3.6 or newer within the Dart 3.x series. Start an emulator or choose a connected device:

```sh
flutter pub get
flutter run
```

The implementation is concentrated in `lib/main.dart`, including the app shell, theme, screen layout, and input widgets. The project uses Google Fonts and Flutter’s Cupertino widgets.

## Work on the UI

Use a local Flutter run to inspect changes on the intended screen size. Run the repository’s checks after changing the widgets:

```sh
flutter analyze
flutter test
```

To turn the prototype into a sign-in screen for an app, add form validation and connect it to the app’s authentication flow.
