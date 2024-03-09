
export const handleGoBack = (navigate) => {
  if (window.history.length > 1) {
    navigate(-1)
  } else {
    navigate("/my-urls")
  }
}
