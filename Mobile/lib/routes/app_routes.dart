import 'package:flutter/material.dart';
import 'package:build_zone/presentation/loginScreen/loginScreen.dart';
import 'package:build_zone/presentation/registerScreen/registerScreen.dart';

class AppRoutes {
  static const String loginScreen = '/login_screen';
  static const String registerScreen = '/register_screen';

  static Map<String, WidgetBuilder> routes = {
    loginScreen: (context) => LoginScreen(),
    registerScreen:(context) => RegisterScreen()
  };


}
