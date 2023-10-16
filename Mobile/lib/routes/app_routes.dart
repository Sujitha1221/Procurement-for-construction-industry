import 'package:build_zone/presentation/addPRScreen/addPRScreen.dart';
import 'package:build_zone/presentation/concernScreen/concernScreen.dart';
import 'package:build_zone/presentation/prScreen/prScreen.dart';
import 'package:flutter/material.dart';
import 'package:build_zone/presentation/loginScreen/loginScreen.dart';
import 'package:build_zone/presentation/registerScreen/registerScreen.dart';

class AppRoutes {
  static const String loginScreen = '/login_screen';
  static const String registerScreen = '/register_screen';
  static const String addPRScreen = '/add_pr_screen';
  static const String prScreen = '/all_pr_screen';
  static const String concernScreen = '/concern_screen';

  static Map<String, WidgetBuilder> routes = {
    loginScreen: (context) => LoginScreen(),
    registerScreen: (context) => RegisterScreen(),
    addPRScreen: (context) => AddPRScreen(),
    prScreen: (context) => PRScreen(),
    concernScreen: (context) => ConcernScreen()
  };
}
