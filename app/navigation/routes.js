/* ---------------------------
 *    Nombre del fichero: routes.js
 *    Descripción: Este fichero recoge todas las rutas de navegación de la app.       
 *    Contenido: Objeto que contiene las distintas rutas de la app.       
 * ---------------------------  
 */

export default Object.freeze({
    // Formato:
    // NOMBRE_RUTA: "ruta_definida_en_la_Stack.Screen_correspondiente",
    // Para referirnos a la ruta en las diferentes llamadas a navigation.navigate de las Screens,
    // emplearemos el NOMBRE_RUTA definido aquí.
    ABOUT: "About",
    ASSOCIATE: "Associate",
    CREATE_ROUTINE: "CreateRoutine",
    CREATE_WORKOUT: "CreateWorkout",
    DO_WORKOUT: "DoingWorkout",
    LISTING_USERS: "ListingUsers",
    LISTING_ROUTINES: "ListingRoutines",
    LISTING_WORKOUTS: "ListingWorkouts",
    MY_ACCOUNT: "Yo",
    MY_DETAILS: "MyDetails",
    PRESCRIBE_TO_USER: "PrescribeToUser",
    PRESCRIPTION_DETAILS: "PrescriptionDetails",
    PRESCRIPTION_TYPES: "PrescriptionTypes",
    ROUTINE_DETAILS: "RoutineDetails",
    USER_DETAILS: "UserDetails",
    USER_PRESCRIPTIONS: "ListingUserPrescriptions",
    USER_RECORDS: "ListingRecords",
    WATCH_LIVE: "WatchingLive",
    WELCOME: "Welcome",
    WORKOUT_DETAILS: "WorkoutDetails",
});