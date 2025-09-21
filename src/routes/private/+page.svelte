<script lang="ts">
  let { data } = $props();
</script>

<section class="container mx-auto max-w-2xl px-6 py-10">
  <h1 class="mb-4 text-3xl font-bold">Private Area</h1>
  <p class="mb-6 text-muted-foreground">Welcome {data.user?.email}</p>
  <form method="POST" action="?/signout">
    <button class="rounded bg-destructive px-4 py-2 text-destructive-foreground">Sign out</button>
  </form>
</section>
