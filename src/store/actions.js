import async from 'async'
let subtitler = window.require('subtitler')

export const addOpenSubtitle = ({ commit }, { subtitle, file }) => {
  commit('ADD_SUBTITLE', {
    name: subtitle.SubFileName,
    episode: subtitle.SeriesEpisode,
    season: subtitle.SeriesSeason,
    download: subtitle.SubDownloadLink,
    exact: subtitle.MatchedBy === 'moviehash',
    dislikes: subtitle.SubBad,
    file: file.path
  })
}

export const handleFile = ({ commit, dispatch }, file) => {
  if (file === undefined) {
    return null // TODO: Mettre un message d'erreur
  }
  subtitler.api.login().then(token => {
    commit('RESET_SUBTITLES')
    commit('START_LOADING')
    async.parallel([
      function (callback) {
        subtitler.api.searchForFile(token, 'eng', file.path).then(subtitles => {
          subtitles.forEach(subtitle => {
            dispatch('addOpenSubtitle', { subtitle, file })
          })
          callback()
        })
      },
      function (callback) {
        subtitler.api.searchForTitle(token, 'eng', file.name).then(subtitles => {
          subtitles.forEach(subtitle => {
            dispatch('addOpenSubtitle', { subtitle, file })
          })
          callback()
        })
      }
    ], _ => {
      commit('END_LOADING')
    })
  })
}

export const download = ({ commit }, subtitle) => {
  let zlib = window.require('zlib')
  let http = window.require('http')
  let fs = window.require('fs')
  let subtitleFile = subtitle.file + '.srt'
  commit('START_LOADING')
  http.get(subtitle.download, function (response) {
    let gunzip = zlib.createGunzip()
    let dest = fs.createWriteStream(subtitleFile)
    response.pipe(gunzip).pipe(dest)
    return gunzip.on('end', function () {
      commit('END_LOADING')
      response.unpipe(gunzip)
      response.unpipe(dest)
    })
  })
}
