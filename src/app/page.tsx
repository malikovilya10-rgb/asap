"use client";

import { useState } from "react";

export default function Home() {
const [isOpen, setIsOpen] = useState(false);
const [mode, setMode] = useState("");
const [registerMethod, setRegisterMethod] = useState("phone");
const [isLogin, setIsLogin] = useState(false);

return (
<main
className="relative flex min-h-screen flex-col bg-cover bg-center bg-no-repeat text-white"
style={{
backgroundImage:
"linear-gradient(rgba(0,0,0,0.60), rgba(0,0,0,0.75)), url('/background.jpg')",
}}
>
<header className="flex justify-center px-6 pt-8">
<img
src="/logo.svg"
alt="ASAP"
className="h-35 w-auto object-contain"
/>
</header>

  <div className="mt-3 w-full px-4 text-center">
    <p className="text-base font-light tracking-[0.18em] text-gray-300">
      Твій час. Твої можливості. Твій заробіток.
    </p>
  </div>

  <section className="mx-auto mt-auto flex w-full max-w-md flex-col gap-3 px-4 pb-8">
    <button
      onClick={() => {
  setMode("Хочу виконувати завдання");
  setIsLogin(false);
  setIsOpen(true);
}}
      className="flex min-h-14 w-full items-center justify-between rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
    >
      <span>Хочу виконувати завдання</span>
      <span className="text-xl font-light">→</span>
    </button>

    <button
      onClick={() => {
        setMode("Хочу дати завдання");
        setIsLogin(false);
        setIsOpen(true);
      }}
      className="flex min-h-14 w-full items-center justify-between rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
    >
      <span>Хочу дати завдання</span>
      <span className="text-xl font-light">→</span>
    </button>
  </section>

  {isOpen && (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4 backdrop-blur-md"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative w-full max-w-md rounded-3xl border border-white/20 bg-[#17191d]/90 p-6 shadow-2xl backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-5 top-5 text-2xl font-light text-gray-400 transition hover:text-white"
        >
          ×
        </button>
        <div className="mb-7 mt-3 text-center">
          <h2 className="text-2xl font-semibold">
            {isLogin ? "З поверненням!" : "Створи акаунт"}
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            {isLogin
              ? "Увійди до свого акаунту ASAP"
              : "Приєднуйся до ASAP"}
          </p>

          <p className="mt-3 text-xs text-gray-300">{mode}</p>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          {!isLogin && (
            <input
              type="text"
              placeholder="Ім'я та прізвище"
              required
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-white/50"
            />
          )}

          <div className="grid grid-cols-2 rounded-xl border border-white/15 bg-white/5 p-1">
            <button
              type="button"
              onClick={() => setRegisterMethod("phone")}
              className={`rounded-lg py-2.5 text-sm transition ${
                registerMethod === "phone"
                  ? "bg-white text-black font-semibold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Телефон
            </button>

            <button
              type="button"
              onClick={() => setRegisterMethod("email")}
              className={`rounded-lg py-2.5 text-sm transition ${
                registerMethod === "email"
                  ? "bg-white text-black font-semibold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Email
            </button>
          </div>

          {registerMethod === "phone" ? (
            <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3 focus-within:border-white/50">
              <span className="text-xl">🇺🇦</span>
              <span className="text-sm font-medium text-white">+380</span>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="XX XXX XX XX"
                maxLength={9}
                required
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
              />
            </div>
          ) : (
            <input
              type="email"
              placeholder="Електронна пошта"
              required
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-white/50"
            />
          )}
          <input
            type="password"
            placeholder={isLogin ? "Пароль" : "Створи пароль"}
            required
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-white/50"
          />

          <button
            type="submit"
            className="mt-2 rounded-full bg-white py-3.5 text-sm font-semibold text-black transition hover:bg-gray-200"
          >
            {isLogin ? "Увійти →" : "Зареєструватися →"}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-gray-400">
          {isLogin ? "Вперше на ASAP?" : "Вже маєш акаунт?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-white underline underline-offset-4"
          >
            {isLogin ? "Зареєструватися" : "Вхід"}
          </button>
        </p>
      </div>
    </div>
  )}
</main>
);
}