import { UserCircleIcon as UserCircleIconOutlined } from "@heroicons/react/24/outline";
import { UserCircleIcon as UserCircleIconSolid } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useAuth } from "context/auth";

const styles = {
  container: "flex p-4 border-b border-black content-center gap-3",
  iconWrapper: "h-6 w-6 content-center",
  icon: "stroke-2",
};

function Header() {
  const { currentUser, logout } = useAuth();
  const isSignedIn = Boolean(currentUser);
  const handleLogout = () => {
    const fn = async () => {
      await logout();
    };
    // eslint-disable-next-line no-void
    void fn();
  };
  return (
    <header className={styles.container}>
      <div className={styles.iconWrapper}>
        {isSignedIn
          ? <UserCircleIconSolid className={styles.icon} />
          : <UserCircleIconOutlined className={styles.icon} />}
      </div>
      {isSignedIn
      // FIXME: introduce button kind text to fix eslint(jsx-a11y/anchor-is-valid) error
      // eslint-disable-next-line
        ? <a onClick={handleLogout}>Sign out</a>
        : <Link href="/login">Sign in</Link>}
    </header>
  );
}

export { Header };
