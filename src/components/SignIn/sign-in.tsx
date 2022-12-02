import { useRouter } from "next/router";
import { FormEventHandler, useState } from "react";
import { useAuth } from "context/auth";
import { Title } from "../Title";

const SignIn = () => {
  const buttonStyle = {
    border: "border-2 border-blue-600 hover:border-blue-700 focus:border-blue-700 active:border-blue-800",
    background:
      "bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800",
    text: "text-white",
    regular: "p-2",
  };

  const styles = {
    container: "flex flex-col mx-3 lg:mx-0",
    form: "flex flex-col",
    email: "w-full h-12 mb-3 p-5 rounded-lg text-lg",
    password: "w-full h-12 mb-3 p-5 rounded-lg  text-lg",
    submit: `${buttonStyle.regular} w-full rounded-lg ${buttonStyle.background} ${buttonStyle.border} flex justify-center ${buttonStyle.text} cursor-pointer`,
    error: "w-full text-red-500 text-center mb-4",
  };

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string |undefined>();
  const router = useRouter();
  const { login } = useAuth();
  // 5 techniques can be found here https://www.learnbestcoding.com/post/40/reactjs-form-submit
  const handleSubmit:FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError("Set email and password");
      return;
    }
    try {
      setError(undefined);
      setLoading(true);
      await login(email, password);
      // get return url from query parameters or default to '/'
      const returnUrl = router.query.returnUrl ?? "/";
      router.push(returnUrl as string);
    } catch (err) {
      setError("Wrong username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Title>Hey what&apos;s up!</Title>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className={styles.email} />
        <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} className={styles.password} />
        {error && <p className={styles.error}>{error}</p>}
        <input id="submit" type="submit" value={loading ? "Loading..." : "Sign in"} className={styles.submit} />
      </form>
    </div>
  );
};

export { SignIn };
