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

/**
 * Inject bookmarks into HTML
 */

const bookmarks = [
  {
    id: "BTm2w2hzLncaZ3E8",
    label: "uni",
    bookmarks: [
      {
        id: "B7HjYsQ7ztrKrWRE",
        label: "timetable",
        url: "https://webdfd.mines-ales.fr/planning-eleves/index.php?url=eleve/17277",
      },
      {
        id: "YNLtIVz1SH1qIQAo",
        label: "courses",
        url: "https://campus2.mines-ales.fr/my/courses.php",
      },
      {
        id: "YNLtIVz1SH1qIQAQ",
        label: "caliap",
        url: "https://caliap.mines-ales.fr/book/liste",
      },
    ],
  },
  {
    id: "ANREU2nxlKoOUu3N",
    label: "external",
    bookmarks: [
      {
        id: "suGPqKMKtbPimBUC",
        label: "notes",
        url: "https://webdfd.mines-ales.fr/cybernotes/frames.php",
      },
      {
        id: "I3vpNldcVl33IMzr",
        label: "unix-users",
        url: "https://admx.welibre.org/",
      },
      {
        id: "WeP4AMu6kR8aiF8J",
        label: "eth-hacking",
        url: "https://github.com/nicosmash/Universities/blob/main/Labs/VirtualLab_What_to_do.md",
      },
      {
        id: "E17ZrbozF3VcU0OU",
        label: "docker",
        url: "https://blog.microlinux.fr/",
      },
    ],
  },
  {
    id: "qVaUYMzwB8zHdHTL",
    label: "other",
    bookmarks: [
      {
        id: "jPpG0kntpb2vBBtK",
        label: "youtube",
        url: "https://youtube.com",
      },
      {
        id: "jCWsEuQTk1oKomf1",
        label: "anime",
        url: "https://nyaa.si",
      },
      {
        id: "ekBuhQL8rUt8jwjC",
        label: "manga",
        url: "https://mangascan-fr.com/",
      },
    ],
  },
  {
    id: "vtf54i91k0J4prNa",
    label: "useful",
    bookmarks: [
      {
        id: "C5U2DC1ej6PeukFZ",
        label: "whatismydns",
        url: "https://www.whatsmydns.net/domain-age",
      },
      {
        id: "0G0obayQobJRLXV5",
        label: "monip",
        url: "http://icanhazip.com/",
      },
      {
        id: "XukT1fgELrf4PEOK",
        label: "speedtest",
        url: "https://librespeed.org",
      },
      {
        id: "PnR9dtgWGT7du6hp",
        label: "dnsdumbster",
        url: "https://dnsdumpster.com/",
      },
    ],
  },
];


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
