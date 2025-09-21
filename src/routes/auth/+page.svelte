<script lang="ts">
  let { data } = $props();
</script>

<section class="container mx-auto max-w-md px-6 py-10">
  <h1 class="mb-6 text-center text-3xl font-bold">Sign up / Log in</h1>
  <div class="space-y-8">
    <form method="POST" action="?/signup" class="space-y-3">
      <h2 class="text-xl font-semibold">Create account</h2>
      <input class="w-full rounded border p-2" name="email" type="email" placeholder="Email" required />
      <input class="w-full rounded border p-2" name="password" type="password" placeholder="Password" required />
      <button class="w-full rounded bg-primary p-2 text-primary-foreground" type="submit">Sign up</button>
    </form>

    <form method="POST" action="?/login" class="space-y-3">
      <h2 class="text-xl font-semibold">Log in</h2>
      <input class="w-full rounded border p-2" name="email" type="email" placeholder="Email" required />
      <input class="w-full rounded border p-2" name="password" type="password" placeholder="Password" required />
      <button class="w-full rounded bg-primary p-2 text-primary-foreground" type="submit">Log in</button>
    </form>
  </div>
</section>
