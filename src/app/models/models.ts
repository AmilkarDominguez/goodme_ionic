
export class AuthPayload {
    access_token?: String
    refresh_token?: String
    expires_in?: number
    token_type?: String
    user?: User
}

export class Course {
    number?: number
    user_id?: number
    site_id?: number
    timetable_id?: number
    titulo?: String
    descripcion?: String
    costo?: number
    fecha?: Date
    semanas?: number
    moneda?: Moneda
    estado?: Estado
    created_at?: Date
    updated_at?: Date
    user?: User
    users?: [User]
}

export class CourseInput {
    user_id?: number
    site_id?: number
    timetable_id?: number
    titulo?: String
    descripcion?: String
    costo?: number
    fecha?: Date
    semanas?: number
    moneda?: Moneda
    estado?: Estado
}

export class CoursePaginator {
    paginatorInfo?: PaginatorInfo
    data?: [Course]
}

export class CourseRoutineUserInput {
    routine_id?: number
    course_user_id?: number
    fecha_inicio?: Date
    fecha_fin?: Date
    estado?: Estado
}

export class CourseUser {
    number?: number
    user_id?: number
    course_id?: number
    estado?: Estado
    created_at?: Date
    updated_at?: Date
    user?: User
    course?: Course
    registry?: Registry
    routines?: [Routine]
}

export class CourseUserInput {
    user_id?: number
    course_id?: number
    estado?: Estado
}

export class CourseUserPaginator {
    paginatorInfo?: PaginatorInfo
    data?: [CourseUser]
}

export class CourseUserRoutine {
    number?: number
    routine_id?: number
    course_user_id?: number
    fecha_inicio?: Date
    fecha_fin?: Date
    estado?: Estado
    created_at?: Date
    updated_at?: Date
    courseuser?: CourseUser
    routine?: Routine
}

export class CourseUserRoutinePaginator {
    paginatorInfo?: PaginatorInfo
    data?: [CourseUserRoutine]
}



enum Estado {
    ACTIVO,
    INACTIVO,
    ELIMINADO,
}

export class TypeExercise {
    number?: number
    user_id?: number
    type_exercise_id?: number
    nombre?: String
    descripcion?: String
    instrucciones?: String
    youtube?: String
    miniatura?: String
    estado?: Estado
    created_at?: Date
    updated_at?: Date
    user?: User
    typeexercese?: TypeExercise
    routines?: [Routine]
    photoexercises?: [PhotoExercise]
}

export class ExerciseInput {
    user_id?: number
    type_exercise_id?: number
    nombre?: String
    descripcion?: String
    instrucciones?: String
    youtube?: String
    miniatura?: String
    estado?: Estado
}

export class ExercisePaginator {
    paginatorInfo?: PaginatorInfo
    data?: [Exercise]
}

export class ExerciseRoutine {
    number?: number
    routine_id?: number
    exercise_id?: number
    estado?: Estado
    created_at?: Date
    updated_at?: Date
    exercise?: Exercise
    routine?: Routine
}

export class ExerciseRoutineInput {
    routine_id?: number
    exercise_id?: number
    estado?: Estado
}

export class ExerciseRoutinePaginator {
    paginatorInfo?: PaginatorInfo
    data?: [ExerciseRoutine]
}

export class ForgotPasswordInput {
    email?: String
}

export class ForgotPasswordResponse {
    status?: String
    message?: String
}

enum Genero {
    MASCULINO,
    FEMENINO
}

export class Hour {
    number?: number
    timetable_id?: number
    dia?: number
    hora_inicio?: Date
    hora_fin?: Date
    cantidad?: number
    estado?: Estado
    created_at?: Date
    updated_at?: Date
    timetable?: TimeTable
}

export class HourInput {
    timetable_id?: number
    dia?: number
    hora_inicio?: Date
    hora_fin?: Date
    cantidad?: number
    estado?: Estado
}

export class HourPaginator {
    paginatorInfo?: PaginatorInfo
    data?: [Hour]
}

export class LoginInput {
    username?: String
    password?: String
}

export class LogoutResponse {
    status?: String
    message?: String
}

enum Moneda {
    BOLIVIANO,
    DOLAR
}



export class NewPasswordWithCodeInput {
    email?: String
    token?: String
    password?: String
    password_confirmation?: String
}

export class OrderByClause {
    field?: String
    order?: SortOrder
}

export class PageInfo {
    hasNextPage?: Boolean
    hasPreviousPage?: Boolean
    startCursor?: String
    endCursor?: String
    total?: number
    count?: number
    currentPage?: number
    lastPage?: number
}

export class PaginatorInfo {
    count?: number
    currentPage?: number
    firstItem?: number
    hasMorePages?: Boolean
    lastItem?: number
    lastPage?: number
    perPage?: number
    total?: number
}

export class PhotoExercise {
    number?: number
    exercise_id?: number
    nombre?: String
    url?: String
    thumb?: String
    estado?: Estado
    created_at?: Date
    updated_at?: Date
    exercise?: Exercise
}

export class PhotoExerciseInput {
    exercise_id?: number
    nombre?: String
    url?: String
    thumb?: String
    estado?: Estado
}

export class PhotoExercisePaginator {
    paginatorInfo?: PaginatorInfo
    data?: [PhotoExercise]
}



export class RefreshTokenInput {
    refresh_token?: String
}

export class RefreshTokenPayload {
    access_token?: String
    refresh_token?: String
    expires_in?: number
    token_type?: String
}

export class RegisterInput {
    nombre_completo?: String
    email?: String
    password?: String
    password_confirmation?: String
    foto?: String
    fecha_nacimiento?: Date
    peso?: number
    altura?: number
    genero?: Genero
    telefono?: String
    token?: String
}

export class Registry {
    number?: number
    user_course_id?: number
    peso?: number
    altura?: number
    tipo?: String
    fecha?: Date
    created_at?: Date
    updated_at?: Date
    courseuser?: CourseUser
}

export class RegistryInput {
    user_course_id?: number
    peso?: number
    altura?: number
    tipo?: String
    fecha?: Date
}

export class RegistryPaginator {
    paginatorInfo?: PaginatorInfo
    data?: [Registry]
}

export class Routine {
    number?: number
    user_id?: number
    nombre?: String
    descripcion?: String
    tipo?: String
    estado?: Estado
    created_at?: Date
    updated_at?: Date
    user?: User
    exercises?: [Exercise]
    usercourses?: [CourseUser]
}

export class RoutineInput {
    user_id?: number
    nombre?: String
    descripcion?: String
    tipo?: String
    estado?: Estado
}

export class RoutinePaginator {
    paginatorInfo?: PaginatorInfo
    data?: [Routine]
}

export class Site {
    number?: number
    user_id?: number
    nombre?: String
    lat?: String
    lng?: String
    zoom?: number
    direccion?: String
    estado?: Estado
    created_at?: Date
    updated_at?: Date
    user?: User
}

export class SiteImput {
    user_id?: number
    nombre?: String
    lat?: String
    lng?: String
    zoom?: number
    direccion?: String
    estado?: Estado
}

export class SitePaginator {
    paginatorInfo?: PaginatorInfo
    data?: [Site]
}

enum SortOrder {
    ASC,
    DESC
}

export class TimeTable {
    number?: number
    user_id?: number
    nombre?: String
    estado?: Estado
    created_at?: Date
    updated_at?: Date
    user?: User
    hours?: [Hour]
}

export class TimeTableInput {
    user_id?: number
    nombre?: String
    estado?: Estado
}

export class TimeTablePaginator {
    paginatorInfo?: PaginatorInfo
    data?: [TimeTable]
}

enum Trashed {
    ONLY,
    WITH,
    WITHOUT
}

export class Exercise {
    number?: number
    user_id?: number
    nombre?: String
    estado?: Estado
    created_at?: Date
    updated_at?: Date
    user?: User
    exercises?: [Exercise]
}

export class TypeExerciseInput {
    user_id?: number
    nombre?: String
    estado?: Estado
}

export class TypeExercisePaginator {
    paginatorInfo?: PaginatorInfo
    data?: [TypeExercise]
}


export class User {
    number?: number
    nombre_completo?: String
    email?: String
    password?: String
    password_confirmation?: String
    foto?: String
    fecha_nacimiento?: String
    peso?: number
    altura?: number
    telefono?: String
    genero?: Estado
    token?: String
    created_at?: Date
    updated_at?: Date
    routines?: [Routine]
    typeexercises?: [TypeExercise]
    exercises?: [Exercise]
    sites?: [Site]
    timetables?: [TimeTable]
    courses?: [Course]
    routinesPaginate?: RoutinePaginator
    typeexercisesPaginate?: TypeExercisePaginator
    exercisesPaginate?: ExercisePaginator
    sitesPaginate?: SitePaginator
    timetablesPaginate?: TimeTablePaginator
    coursesPaginate?: CoursePaginator
    coursesA?: [Course]
}

export class UserInput {
    nombre_completo?: String
    email?: String
    foto?: String
    fecha_nacimiento?: Date
    peso?: number
    altura?: number
    genero?: Estado
    telefono?: String
    token?: String
}

export class UserPaginator {
    paginatorInfo?: PaginatorInfo
    data?: [User]
}