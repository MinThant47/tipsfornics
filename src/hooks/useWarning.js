import { useState, useEffect } from "react";
import { Prompt } from "react-router-dom";

const useWarning = (message = "Really? Your work is unsaved.") => {
  const [isDirty, setDirty] = useState(false);
  useEffect(() => {
    window.onbeforeunload = isDirty && (() => message);
    return () => {
      window.onbeforeunload = null;
    };
  }, [isDirty, message]);

  const routerPrompt = <Prompt when={isDirty} message={message} />;

  return [routerPrompt, () => setDirty(true), () => setDirty(false)];
};

export default useWarning;
