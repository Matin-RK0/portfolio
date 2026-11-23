# Blue Music Player

A Flutter player for music already stored on your device. It includes a song browser, search, a compact player, and a full player screen. The project uses Android media access and an audio service for background playback.

## Run on Android

Use a Flutter installation with Dart `>=3.3.3 <4.0.0`, an Android device or emulator with local audio files, and grant the media permission when the app requests it.

```sh
flutter pub get
flutter run
```

If no tracks appear, check the device media permission and verify that the device contains indexed audio files. Other target folders are present in the repository, but this setup focuses on Android.

## How it is organized

| Path | Responsibility |
| --- | --- |
| `lib/screens/Home/` | Library, mini player, and song list. |
| `lib/screens/Player/` | Player screen and playback controls. |
| `lib/screens/search/` | Search UI. |
| `lib/notifiers/songs_provider.dart` | Library and playback state for the UI. |
| `lib/services/` | Media discovery, artwork, playback, persistence, and theme helpers. |

`just_audio` handles playback, `audio_service` connects background controls, and `on_audio_query` reads local audio metadata.

```sh
flutter analyze
flutter test
```
