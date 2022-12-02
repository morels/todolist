import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

const styles = {
  footer: "py-16 px-0 max-w-5xl m-auto flex grow gap-[1rem] items-center py-[2rem] px-0 border-t border-[#eaeaea]",
  link: "flex gap-1 content-center",
  iconWrapper: "flex",
  icon: "h-4 w-4 self-center stroke-2",
};

const Footer = () => (
  <footer className={styles.footer}>
    <a href="https://github.com/morels" className={styles.link}>
      My GitHub
      {" "}
      <span className={styles.iconWrapper}>
        <ArrowTopRightOnSquareIcon className={styles.icon} />
      </span>
    </a>
    <a href="https://it.linkedin.com/in/lcmrl/" className={styles.link}>
      My LinkedIn
      {" "}
      <ArrowTopRightOnSquareIcon className={styles.icon} />
    </a>
    <span>Luca Morelli</span>
  </footer>
);

export { Footer };
