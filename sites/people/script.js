$(function () {
  $('#table').bootstrapTable()
})
$('#table').click((ev) => {
  try {
    let val = ev.target.parentElement.parentElement.firstChild.childNodes[1].innerText;
    if (!isNaN(val)) {
      if (!(val == "")) {
        window.open("/sites/people/singleuser/index.html?id=" + val)
      }
    } else {
      throw Error("");
    }
  } catch (error) {
    try {
      let val = ev.target.parentElement.childNodes[0].innerText;
      if (!isNaN(val)) {
        window.open("/sites/people/singleuser/index.html?id=" + val)
      }
    } catch (_err) { }
  }
});

function teamformatter(value) {
  if (!(value == null || value == "null" || value == "-" || value == "")) {
    let a = document.createElement("a")
    a.href = "/sites/teams/overview/index.html?id=" + encodeURIComponent(value);
    a.innerText = value;
    return a.outerHTML;
  } else {
    return "-"
  }
}

function famformatter(value) {
  if (!(value == null || value == "null" || value == "-" || value == "")) {
    let a = document.createElement("a")
    a.href = "/sites/familys/modify/index.html?id=" + encodeURIComponent(value);
    a.innerText = value;
    return a.outerHTML;
  } else {
    return "-"
  }
}

function mailformatter(value) {
  if (!(value == null || value == "null" || value == "-" || value == "")) {
    let a = document.createElement("a")
    a.href = "mailto:" + (value);
    a.innerText = value;
    return a.outerHTML;
  } else {
    return "-"
  }
}

function telformatter(value) {
  if (!(value == null || value == "null" || value == "-" || value == "")) {
    let a = document.createElement("a")
    a.href = "tel:" + (value);
    a.innerText = value;
    return a.outerHTML;
  } else {
    return "-"
  }
}