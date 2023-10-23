import 'package:build_zone/presentation/addPRScreen/addPRScreen.dart';
import 'package:build_zone/presentation/prScreen/prScreen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  

  testWidgets('PRScreen navigates to add PR screen on FAB press', (WidgetTester tester) async {

    await tester.pumpWidget(MaterialApp(
      home: PRScreen(),
    ));

    // Find the floating action button and tap it.
    await tester.tap(find.byIcon(Icons.add));

    // Wait for the navigation to complete.
    await tester.pumpAndSettle();

    // Verify that we have navigated to the Add PR screen.
    expect(find.byType(AddPRScreen), findsOneWidget);
  });
}// TODO Implement this library.