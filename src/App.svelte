<script lang="typescript">
    import Pusher from "pusher-js"

    Pusher.logToConsole = true

    const pusher = new Pusher('568a922f75e7dbd9eb1a', {
      cluster: 'ap3'
    })

    const channel = pusher.subscribe("my-channel")
    channel.bind("my-event", data => {
        alert(JSON.stringify(data))
    })
</script>

<div class="App">
    hi
</div>

<style>

</style>
