# Zoodex Flutter

A Flutter prototype for browsing local food vendors. It brings together promotional banners, categories, vendor cards, discounts, and a map-based location picker.

## Run it

Use a Flutter installation with Dart 3.6 or newer within the Dart 3.x series. Select an Android device or emulator in Flutter, then run:

```sh
flutter pub get
flutter run
```

The app uses Dio for network requests and Provider for UI state. If backend data is unavailable, check the endpoint configuration in `lib/utils/constants.dart` and the request code in `lib/services/api_service.dart`. The location picker uses Flutter Map and device location/geocoding plugins; location permissions depend on the platform and device.

## Source layout

- `lib/pages/` and `lib/views/`: navigation shell and home feed sections.
- `lib/controllers/`: state for categories, vendors, banners, offers, and location.
- `lib/models/` and `lib/services/`: data models and network integration.
- `lib/widgets/map_picker.dart`: map-based location selection.

For local checks:

```sh
flutter analyze
flutter test
```
