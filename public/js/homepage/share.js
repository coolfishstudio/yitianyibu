/* eslint-disable */
window.onload = function () {
    html2canvas(document.getElementById('shareCard'), {
        onrendered: (canvas) => {
            try {
                const img = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
                window.parent.document.getElementById('shareCard').src = img
            } catch (e) {
                alert('生成邀请函失败，请联系管理员。')
                console.error(e)
            }
        }
    })
}
/* eslint-enable */
