# Flutter Supabase Posts Example\n\nResumen:
- App Flutter mínima que permite signup/login y CRUD de posts.
  - Crear posts via Edge Function (asigna user_id en servidor).
  - Actualizar y borrar se hacen desde el cliente (RLS obliga que sea owner).
    
  - Configuración:
    - 1. Reemplaza los placeholders SUPABASE_URL y SUPABASE_ANON_KEY pasándolos por build-time:
      ```bash   flutter run --dart-define=SUPABASE_URL=https://<tu-proyecto>.supabase.co --dart-define=SUPABASE_ANON_KEY=<anon_key> --dart-define=CREATE_POST_FUNCTION_URL=https://<project>.functions.supabase.co/create-post
       ```       
    - 2. Dependencias:
         ```bash
           flutter pub get
            ```
    - 3. Ejecutar:
         ```bash
            flutter run
            ```
         Edge Function:
          Desplegar la función create-post y establecer secret SUPABASE_SERVICE_ROLE_KEY en supabase:
            ```bash
              supabase secrets set SUPABASE_SERVICE_ROLE_KEY="<service-role-key>"
            supabase functions deploy create-post
              ```
         
    - Notas de seguridad:
           - Nunca expongas service_role key en el cliente.
             - RLS protege operaciones directas desde el cliente.
               - Edge Function usa service_role key para insertar posts de forma confiable porque verifica el token del usuario antes de insertar.
