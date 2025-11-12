# supabase-posts-example

Proyecto ejemplo que muestra:
- Script SQL para crear la tabla `posts` con RLS (Row Level Security).
- Edge Function (Deno/TypeScript) `create-post` que crea posts asignando `user_id` a partir del token del usuario (usa service_role key).
- App Flutter mínima que permite signup/login y CRUD de posts. La creación de posts usa la Edge Function para que el cliente NO envíe `user_id`.

Sustituye los placeholders por tus valores de Supabase:
- SUPABASE_URL -> https://<tu-proyecto>.supabase.co
- SUPABASE_ANON_KEY -> tu anon key
- SUPABASE_SERVICE_ROLE_KEY -> tu service_role key (solo como secret en Supabase)

## Instrucciones rápidas:
1. Ejecuta `sql/setup_posts.sql` en el SQL editor de tu proyecto Supabase.
2. Despliega la función en `functions/create-post` con la CLI de supabase:
   ```bash
   supabase login
   supabase functions deploy create-post
   supabase secrets set SUPABASE_SERVICE_ROLE_KEY="<service_role_key>"
   ```
3. Configura y ejecuta la app Flutter en `flutter_example/`:
   ```bash
   flutter pub get
   flutter run --dart-define=SUPABASE_URL=https://<tu-proyecto>.supabase.co --dart-define=SUPABASE_ANON_KEY=<anon_key> --dart-define=CREATE_POST_FUNCTION_URL=https://<project>.functions.supabase.co/create-post
   ```