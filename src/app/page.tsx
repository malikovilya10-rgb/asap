"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "./lib/supabase";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("");
  const [registerMethod, setRegisterMethod] = useState("phone");
  const [isLogin, setIsLogin] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const ctaRef = useRef<HTMLElement | null>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const element = ctaRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowButton(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (registerMethod === "phone") {
      setMessage(
        "Реєстрація через телефон скоро буде доступна. Обери Email."
      );
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        setMessage("Ви успішно увійшли!");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            },
          },
        });

        if (error) throw error;

        setMessage("Перевір свою пошту для підтвердження реєстрації.");
      }
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Сталася помилка."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-[165svh] px-5 text-white">
      {/* Фоновое изображение */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/background.jpg')",
        }}
      />

      {/* Затемнение фона */}
      <div className="fixed inset-0 z-[1] bg-black/60" />

      {/* Главный экран */}
      <section className="relative z-10 flex min-h-[85svh] flex-col items-center justify-center">
        <div className="flex w-full max-w-md flex-col items-center">
          <img
            src="/logo.svg"
            alt="ASAP"
            className="mb-5 w-64 max-w-[75%]"
          />

          <p className="text-center text-sm text-gray-300">
            Твій час. Твої можливості. Твій заробіток.
          </p>
        </div>
      </section>

      {/* Кнопка Розпочати */}
      <section
        ref={ctaRef}
        className="relative z-10 flex min-h-[80svh] justify-center pt-[8svh]"
      >
        <button
          type="button"
          onClick={() => {
            setMode("Розпочати");
            setIsLogin(false);
            setIsOpen(true);
          }}
          className={`h-fit rounded-full border border-white/30 bg-white/10 px-12 py-4 text-base font-medium text-white shadow-xl backdrop-blur-md transition-all duration-700 ease-out hover:bg-white/20 active:scale-95 ${
            showButton
              ? "translate-y-0 opacity-100"
              : "translate-y-16 opacity-0"
          }`}
        >
          Розпочати →
        </button>
      </section>

      {/* Окно регистрации */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-3xl border border-white/15 bg-[#111]/95 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-5 top-5 text-2xl text-gray-400 transition hover:text-white"
            >
              ×
            </button>

            <div className="mb-7 mt-3 text-center">
              <h2 className="text-2xl font-semibold">
                {isLogin ? "З поверненням!" : "Створити акаунт"}
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                {isLogin
                  ? "Увійди, щоб продовжити"
                  : "Приєднуйся до спільноти ASAP"}
              </p>

              <p className="mt-3 text-xs text-gray-300">{mode}</p>
            </div>

            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit}
            >
              {!isLogin && (
                <input
                  type="text"
                  placeholder="Ім'я та прізвище"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-white/50"
                />
              )}

              <div className="grid grid-cols-2 rounded-xl border border-white/15 bg-white/5 p-1">
                <button
                  type="button"
                  onClick={() => {
                    setRegisterMethod("phone");
                    setMessage("");
                  }}
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
                  onClick={() => {
                    setRegisterMethod("email");
                    setMessage("");
                  }}
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
                    value={phone}
                    onChange={(e) =>
                      setPhone(
                        e.target.value.replace(/\D/g, "").slice(0, 9)
                      )
                    }
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
                  />
                </div>
              ) : (
                <input
                  type="email"
                  placeholder="Електронна пошта"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-white/50"
                />
              )}

              <input
                type="password"
                placeholder={isLogin ? "Пароль" : "Створи пароль"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-white/50"
              />

              {message && (
                <p className="text-center text-sm text-gray-200">
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 rounded-full bg-white py-3.5 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:opacity-50"
              >
                {loading
                  ? "Зачекай..."
                  : isLogin
                    ? "Увійти →"
                    : "Зареєструватися →"}
              </button>
            </form>

            <p className="mt-5 text-center text-xs text-gray-400">
              {isLogin ? "Вперше на ASAP?" : "Вже маєш акаунт?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setMessage("");
                }}
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
