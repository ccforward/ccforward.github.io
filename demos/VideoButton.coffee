class VideoButton extends Button

  name: 'video'

  icon: 'video-o'

  htmlTag: 'embed, iframe'

  disableTag: 'pre, table, div'

  videoPlaceholder: 'video'


  needFocus: false

  _init: () ->
    @title = @_t(@name)

    
    @editor.body.on 'mousedown', =>
      $videoWrap = $('.J_UploadVideoBtn').data('videowrap')
      if $videoWrap and $videoWrap.html() == @videoPlaceholder
        $videoWrap.remove()
        $('.J_UploadVideoBtn').data('videowrap',null)
      @popover.hide()

    
    super()

  render: (args...) ->
    super args...
    @popover = new VideoPopover
      button: @



  renderMenu: ->
    super()


  _status: ->
    @_disableStatus()

  loadVideo: ($video, src, callback) ->
    try
      $node = $(src)
      if $node.length and !$node.is(@disableTag)
        $video.html(src)
      else
        $video.remove()
    catch e
      $video.remove()

    @popover.hide()


    callback($video)



  createVideo: () ->
    @editor.focus() unless @editor.inputManager.focused
    range = @editor.selection.range()
    if range
      range.deleteContents()
      @editor.selection.range range

    $videoWrap = $('<p/>').addClass('video-wrap').html(@videoPlaceholder);
    range.insertNode $videoWrap[0]
    @editor.selection.setRangeAfter $videoWrap, range
    @editor.trigger 'valuechanged'

    $videoWrap

  parseVideo: (src)->
    # http://v.youku.com/v_show/id_XMTI2MzU5MDg0OA==.html
    if src.indexOf('http://v.youku.com') == 0
      youkuID = src.match(/v_show\/id_(\S*).html/)[1]
      src = 'http://player.youku.com/player.php/sid/' + youkuID + '/v.swf'
    # http://player.youku.com/player.php/sid/XMTMwNzIxMjA0OA==/v.swf
    if src.indexOf('http://player.youku.com') == 0
      src = '<embed src="' + src + '" quality="high" width="480" height="400" align="middle" allowScriptAccess="always" allowFullScreen="true" mode="transparent" type="application/x-shockwave-flash"></embed>'
    src

  command: () ->
    self = this
    $video = @createVideo()
    #先弹出输入框
    @popover.show($video)
    $('.J_UploadVideoBtn').data('videowrap', $video)
    $(document).one 'click', '.J_UploadVideoBtn', (e) ->
      src = self.parseVideo($('.video-link').val())
      $('.video-link').val('')
      self.loadVideo $('.J_UploadVideoBtn').data('videowrap'), src, =>
        self.editor.trigger 'valuechanged'


class VideoPopover extends Popover

  offset:
    top: 6
    left: -4

  render: ->
    tpl = """
    <div class="link-settings">
      <input placeholder="#{ @_t 'videoPlaceholder' }" type="text" class="video-link">
      <div class="video-upload">
        <button class="btn J_UploadVideoBtn">#{ @_t 'uploadVideoBtn' }</div>
      </div>
    </div>
    """
    @el.addClass('video-popover')
      .append(tpl)
    
    @editor.on 'valuechanged', (e) =>
      @refresh() if @active

    

  show: (args...) ->
    super args...
    $videoWrap = @target


Simditor.Toolbar.addButton VideoButton
