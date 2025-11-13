# Edge Function: create-post

Descripción:
- Edge Function HTTP POST que crea un post con el user_id extraído del token enviado por el cliente.
- El cliente no debe enviar user_id.

Variables de entorno requeridas:
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY (configurado como secret en la plataforma)

Cómo desarrollar y desplegar:
1. Instalar supabase CLI: https://supabase.com/docs/guides/cli
2. Inicializar funciones (si no lo hiciste):
   ```bash
   supabase login
   supabase init
   ```

3. Crear la función localmente:
   ```bash
   supabase functions new create-post
   ```
   (esto crea functions/create-post/index.ts — reemplaza con el archivo provisto)

4. Probar localmente:
   ```bash
   export SUPABASE_URL="https://<tu-proyecto>.supabase.co"
   export SUPABASE_SERVICE_ROLE_KEY="<service-role-key>"
   supabase functions serve --env-file .env
   ```

5. Deploy:
   ```bash
   supabase secrets set SUPABASE_SERVICE_ROLE_KEY="<service-role-key>"
   supabase functions deploy create-post
   ```

Llamada desde el cliente:
- POST https://<project>.functions.supabase.co/create-post
- Headers:
    Authorization: Bearer <access_token>
    Content-Type: application/json
- Body:
    { "title": "Mi post", "content": "Contenido..." }