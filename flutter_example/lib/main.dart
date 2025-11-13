import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'services/supabase_client.dart';
import 'screens/login_page.dart';
import 'screens/home_page.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await SupabaseService.init();

  final session = SupabaseService.client().auth.currentSession;

  runApp(MyApp(authed: session != null));
}

class MyApp extends StatelessWidget {
  final bool authed;
  MyApp({required this.authed});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Supabase Posts',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: authed ? HomePage() : LoginPage(),
    );
  }
}