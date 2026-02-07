"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { CircleAlert, LoaderCircle, Plus, UserPlus } from "lucide-react";
//import { useCreateUser } from "@/axios/mutations/user";
import { toast } from "sonner";
import Select from "./components/select";

interface FormData {
  name: string;
  nit: string;
  email: string;
  phone: string;
  profile: string;
  status: string;
}

const validationSchema = yup.object({
  name: yup
    .string()
    .required("El nombre completo es requerido")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  nit: yup
    .string()
    .required("El NIT es requerido")
    .matches(/^\d{8,12}$/, "El NIT debe tener entre 8 y 12 dígitos")
    .transform((value) => value.replace(/[-\s]/g, "")),
  email: yup
    .string()
    .required("El email es requerido")
    .email("El email no tiene un formato válido")
    .max(100, "El email no puede exceder 100 caracteres"),
  phone: yup
    .string()
    .required("El teléfono es requerido")
    .matches(/^\+?[\d\s-()]{8,15}$/, "El teléfono no tiene un formato válido"),
  profile: yup
    .string()
    .required("Debe seleccionar un perfil")
    .oneOf(["administrador", "requirente", "coordinador"], "Perfil inválido"),
  status: yup
    .string()
    .required("Debe seleccionar un estado")
    .oneOf(["activo", "inactivo"], "Estado inválido"),
});

export default function UserRegistration() {
  //const { mutateAsync } = useCreateUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const perfilOptions = [
    { value: "administrador", label: "Administrador" },
    { value: "requirente", label: "Requirente" },
    { value: "coordinador", label: "Coordinador" },
  ];

  const estadoOptions = [
    { value: "activo", label: "Activo" },
    { value: "inactivo", label: "Inactivo" },
  ];

  const onSubmit = async (data: FormData) => {
    try {
      /*      await mutateAsync({
        ...data,
        status: data.status === "activo" ? true : false,
      }); */
      handleClear();
      toast.success(
        <span className="font-semibold text-base">Usuario creado</span>,
      );
    } catch (error: any) {
      if (error.status === 409) {
        toast.error(
          <span className="font-semibold text-base">
            Ya existe un usuario con el mismo email
          </span>,
        );
      } else {
        console.log("Error al registrar usuario:", error.status);

        toast.error(
          <span className="font-semibold text-base">
            Error al registrar usuario. Por favor, intente nuevamente
          </span>,
        );
      }
    }
  };

  const handleClear = () => {
    reset();
  };
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
            <UserPlus color="white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Registro de Usuario
          </h1>
          <p className="text-gray-600">
            Complete la información para crear una nueva cuenta
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Nombre Completo */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Nombre Completo *
              </label>
              <input
                type="text"
                id="name"
                {...register("name")}
                className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                  errors.name
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:border-green-500 focus:ring-green-200"
                }`}
                placeholder="Ingrese el nombre completo"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <CircleAlert size={13} className="mr-2" />
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* NIT y Email en fila */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="nit"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  NIT *
                </label>
                <input
                  type="text"
                  id="nit"
                  {...register("nit")}
                  className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                    errors.nit
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-green-500 focus:ring-green-200"
                  }`}
                  placeholder="123456789"
                />
                {errors.nit && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <CircleAlert size={13} className="mr-2" />
                    {errors.nit.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                    errors.email
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-green-500 focus:ring-green-200"
                  }`}
                  placeholder="usuario@ejemplo.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <CircleAlert size={13} className="mr-2" />
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Teléfono */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Teléfono *
              </label>
              <input
                type="tel"
                id="phone"
                {...register("phone")}
                className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                  errors.phone
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:border-green-500 focus:ring-green-200"
                }`}
                placeholder="+57 300 123 4567"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <CircleAlert size={13} className="mr-2" />
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <Select
                label="Perfil *"
                options={perfilOptions}
                value={watch("profile")}
                onChange={(value) => {
                  setValue("profile", value);
                }}
                placeholder="Selecciona un país"
                id="profile"
                error={!watch("profile") && errors.profile ? true : false}
              />
              {errors.profile && !watch("profile") && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <CircleAlert size={13} className="mr-2" />
                  {errors.profile.message}
                </p>
              )}
              <div>
                <Select
                  label="Estado *"
                  options={estadoOptions}
                  value={watch("status")}
                  onChange={(value) => {
                    setValue("status", value);
                  }}
                  placeholder="Selecciona un país"
                  error={!watch("status") && errors.status ? true : false}
                  id="status"
                />

                {errors.status && !watch("status") && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <CircleAlert size={13} className="mr-2" />
                    {errors.status.message}
                  </p>
                )}
              </div>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="button"
                onClick={handleClear}
                className="flex-1 cursor-pointer px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-100 focus:ring-opacity-50"
              >
                Limpiar
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 cursor-pointer px-6 py-3 bg-linear-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <LoaderCircle className="animate-spin" />
                    Registrando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Plus />
                    Registrar Usuario
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">Los campos marcados con * son obligatorios</p>
        </div>
      </div>
    </div>
  );
}
