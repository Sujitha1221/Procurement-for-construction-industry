import 'package:flutter/material.dart';
import 'package:build_zone/widgets/custom_elevated_button.dart';

import '../../widgets/custom_text_form_field.dart';

class ConcernScreen extends StatelessWidget {
  ConcernScreen({Key? key}) : super(key: key);

  TextEditingController textController = TextEditingController();
  GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Provide Concern"),
      ),
      body: Form(
        key: _formKey,
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CustomTextFormField(
                controller: textController,
                hintText: "Enter Concern",
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return "Concern field cannot be left blank";
                  }
                  return null;
                },
              ),
              SizedBox(height: 20.0),
              CustomElevatedButton(
                onTap: () {
                  if (_formKey.currentState!.validate()) {
                    // Perform your submit action here
                    String enteredText = textController.text;
                    print("Entered Text: $enteredText");

                    // You can add your logic here for what to do with the entered text.
                  } else {
                    // Show an alert if the form is not valid (input field is empty)
                    showDialog(
                      context: context,
                      builder: (context) {
                        return AlertDialog(
                          title: Text("Validation Error"),
                          content: Text("Concern field cannot be left blank."),
                          actions: <Widget>[
                            TextButton(
                              child: Text('OK'),
                              onPressed: () {
                                Navigator.of(context).pop();
                              },
                            ),
                          ],
                        );
                      },
                    );
                  }
                },
                text: "Submit",
              ),
            ],
          ),
        ),
      ),
    );
  }
}
