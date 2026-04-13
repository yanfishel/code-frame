
export const signUpOptions = (redirect:string, fallback:string) => {
  return {
    signInFallbackRedirectUrl: fallback,
    fallbackRedirectUrl: fallback,
    signInForceRedirectUrl: redirect,
    forceRedirectUrl: redirect,
  };
}

export const signInOptions = (redirect:string, fallback:string) => {
  return {
    signUpFallbackRedirectUrl: fallback,
    fallbackRedirectUrl: fallback,
    signUpForceRedirectUrl: redirect,
    forceRedirectUrl: redirect,
  };
}