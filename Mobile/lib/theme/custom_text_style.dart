import 'package:flutter/material.dart';
import '../core/app_export.dart';

/// A collection of pre-defined text styles for customizing text appearance,
/// categorized by different font families and weights.
/// Additionally, this class includes extensions on [TextStyle] to easily apply specific font families to text.

class CustomTextStyles {

  static get alataPrimary => TextStyle(
        color: theme.colorScheme.primary,
        fontSize: 6.fSize,
        fontWeight: FontWeight.w400,
      ).alata;
  // Body text style
  static get bodyMediumPrimary => theme.textTheme.bodyMedium!.copyWith(
        color: theme.colorScheme.primary,
      );
  // Display text style
  static get displaySmallPrimary => theme.textTheme.displaySmall!.copyWith(
        color: theme.colorScheme.primary.withOpacity(1),
      );
  // Headline text style
  static get headlineSmallBackground => theme.textTheme.headlineSmall!.copyWith(
        color: theme.colorScheme.background,
      );
  static get headlineSmallOnPrimary => theme.textTheme.headlineSmall!.copyWith(
        color: theme.colorScheme.onPrimary,
      );
  // Title text style
  static get titleLargeBlack900 => theme.textTheme.titleLarge!.copyWith(
        color: appTheme.black900.withOpacity(0.53),
      );
  static get titleLargePrimary => theme.textTheme.titleLarge!.copyWith(
        color: theme.colorScheme.primary.withOpacity(1),
      );

  static get headlineSmallPrimary => theme.textTheme.headlineSmall!.copyWith(
        color: theme.colorScheme.primary,
      );

  static get titleLargeBlack90022 => theme.textTheme.titleLarge!.copyWith(
        color: appTheme.black900,
        fontSize: 30.fSize,
      );

      static get headlineSmallBlack90024 => theme.textTheme.headlineSmall!.copyWith(
        color: appTheme.black900,
        fontSize: 24.fSize,
      );

      static get headlineSmallOrange500 => theme.textTheme.headlineSmall!.copyWith(
        color: appTheme.orange500,
        fontSize: 24.fSize,
      );

      static get headlineSmallWhiteA700 => theme.textTheme.headlineSmall!.copyWith(
        color: appTheme.whiteA700,
      );
}

extension on TextStyle {
  TextStyle get alata {
    return copyWith(
      fontFamily: 'Alata',
    );
  }
}
