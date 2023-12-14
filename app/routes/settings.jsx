import { useDarkMode } from "../components/DarkModeContext";
export default function Settings() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return <div className={`${isDarkMode ? "dark " : ""}`}></div>;
}
