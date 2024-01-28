/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","maps":"https://maps.google.com/","youtube":"https://youtube.com","gmail":"https://mail.google.com"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"BTm2w2hzLncaZ3E8","label":"uni","bookmarks":[{"id":"B7HjYsQ7ztrKrWRE","label":"timetable","url":"https://edt.xeylou.fr"},{"id":"YNLtIVz1SH1qIQAo","label":"courses","url":"https://elearn.univ-pau.fr/login/index.php"},{"id":"Thshjg1zQbErPwai","label":"mail","url":"https://partage.univ-pau.fr"}]},{"id":"ANREU2nxlKoOUu3N","label":"perso","bookmarks":[{"id":"suGPqKMKtbPimBUC","label":"github","url":"https://github.com/xeylou"},{"id":"I3vpNldcVl33IMzr","label":"mail#1","url":"https://laposte.net/accueil"},{"id":"E17ZrbozF3VcU0OU","label":"drive","url":"https://nextcloud.xeylou.fr"},{"id":"WeP4AMu6kR8aiF8J","label":"mail#2","url":"https://office.com"}]},{"id":"qVaUYMzwB8zHdHTL","label":"other","bookmarks":[{"id":"jPpG0kntpb2vBBtK","label":"youtube","url":"https://youtube.com"},{"id":"jCWsEuQTk1oKomf1","label":"anime","url":"https://nyaa.si"},{"id":"ekBuhQL8rUt8jwjC","label":"manga","url":"https://mangascan-fr.com/"}]},{"id":"vtf54i91k0J4prNa","label":"useful","bookmarks":[{"id":"C5U2DC1ej6PeukFZ","label":"whatismydns","url":"https://whatismydns.net"},{"id":"0G0obayQobJRLXV5","label":"monip","url":"https://monip.aditu.fr"},{"id":"XukT1fgELrf4PEOK","label":"speedtest","url":"https://librespeed.org"},{"id":"PnR9dtgWGT7du6hp","label":"dnsdumbster","url":"https://dnsdumpster.com/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
