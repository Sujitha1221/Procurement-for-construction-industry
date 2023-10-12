import 'package:build_zone/core/app_export.dart';
import 'package:build_zone/widgets/custom_elevated_button.dart';
import 'package:build_zone/widgets/custom_text_form_field.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';


class SiteManager {
  String empId;
  String name;
  String password;

  SiteManager(
      {required this.empId, required this.name, required this.password});

  Map<String, dynamic> toJson() {
    return {
      'empId': empId,
      'name': name,
      'password': password,
    };
  }
}

// ignore: must_be_immutable
class RegisterScreen extends StatelessWidget {
  RegisterScreen({Key? key})
      : super(
          key: key,
        );

        

  TextEditingController employeeidlabelController = TextEditingController();

  TextEditingController nameController = TextEditingController();

  TextEditingController passwordController = TextEditingController();

  TextEditingController rePasswordController = TextEditingController();

  GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    mediaQueryData = MediaQuery.of(context);

    return SafeArea(
      child: Scaffold(
        resizeToAvoidBottomInset: false,
        body: Form(
          key: _formKey,
          child: Container(
            width: double.maxFinite,
            padding: EdgeInsets.symmetric(horizontal: 28.h),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                SizedBox(height: 11.v),
                SizedBox(
                  height: 172.v,
                  width: 166.h,
                  child: Stack(
                    alignment: Alignment.bottomCenter,
                    children: [
                      CustomImageView(
                        imagePath: ImageConstant.imgWorkers,
                        height: 130.adaptSize,
                        width: 130.adaptSize,
                        alignment: Alignment.topCenter,
                      ),
                      Align(
                        alignment: Alignment.bottomCenter,
                        child: RichText(
                          text: TextSpan(
                            children: [
                              TextSpan(
                                text: "Build",
                                style: theme.textTheme.displaySmall,
                              ),
                              TextSpan(
                                text: "Zone",
                                style: CustomTextStyles.displaySmallPrimary,
                              ),
                            ],
                          ),
                          textAlign: TextAlign.left,
                        ),
                      ),
                    ],
                  ),
                ),
                Text(
                  "S  O  L  U  T  I  O  N  S",
                  style: theme.textTheme.bodyMedium,
                ),
                SizedBox(height: 81.v),
                CustomTextFormField(
                  controller: employeeidlabelController,
                  hintText: "Employee ID",
                ),
                SizedBox(height: 32.v),
                CustomTextFormField(
                  controller: nameController,
                  hintText: "Name",
                ),
                SizedBox(height: 32.v),
                CustomTextFormField(
                  controller: passwordController,
                  hintText: "Password",
                  textInputAction: TextInputAction.done,
                  textInputType: TextInputType.visiblePassword,
                  obscureText: true,
                ),
                SizedBox(height: 32.v),
                CustomTextFormField(
                  controller: rePasswordController,
                  hintText: "Confirm Password",
                  textInputAction: TextInputAction.done,
                  textInputType: TextInputType.visiblePassword,
                  obscureText: true,
                ),
                CustomElevatedButton(
                  text: "Sign up",
                  margin: EdgeInsets.only(
                    left: 38.h,
                    top: 61.v,
                    right: 38.h,
                  ),
                  onTap: () {
                    if (passwordController.text != rePasswordController.text) {
                      print("Password mismatch");
                    } else {
                      final siteManager = SiteManager(
                        empId: employeeidlabelController.text,
                        name: nameController.text,
                        password: passwordController.text,
                      );

                      register(siteManager);
                    }
                  },
                ),
                SizedBox(height: 40.v),
                Opacity(
                  opacity: 0.5,
                  child: Text(
                    "or",
                    style: theme.textTheme.titleLarge,
                  ),
                ),
                SizedBox(height: 9.v),
                GestureDetector(
                  onTap: () {
                    // Add your onTap logic here
                    Navigator.of(context)
                        .pushReplacementNamed('/login_screen');
                  },
                  child: Text(
                    'Sign in',
                    style: theme.textTheme.headlineSmall,
                  ),
                ),
                SizedBox(height: 17.v),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Future register(SiteManager siteManager) async {
    try {
      final response = await http.post(
        Uri.parse('http://192.168.56.1:8080/site-manager/register'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(siteManager.toJson()), // Convert User object to JSON
      );

      if (response.statusCode == 200) {
        // Successful request
        return response.body;
      } else {
        // Handle error responses here
        print('Request failed with status: ${response.statusCode}');
        print('Response body: ${response.body}');
        throw Exception('Failed to create site manager');
      }
    } catch (e) {
      // Handle network errors or other exceptions here
    }
  }
}
