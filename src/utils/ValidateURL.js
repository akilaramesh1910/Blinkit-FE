const ValidateURL = (name) => {
  const url = name?.toString()?.replaceAll(" ", "-")?.replaceAll(",", "-")?.replaceAll("&", "-")
  return url
}

export default ValidateURL