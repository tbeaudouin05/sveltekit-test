<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
  import { Separator } from '$lib/components/ui/separator';
  import faviconSvg from '$lib/assets/favicon.svg';

  const onPrimary = () => alert('Hello World! 🎉');
  const onSecondary = () => window.open('https://svelte.dev/docs', '_blank');
</script>

<section class="relative isolate min-h-[75vh] overflow-hidden bg-gradient-to-b from-background via-background to-background">
  <div class="absolute inset-0 -z-10 bg-[radial-gradient(40rem_20rem_at_top,theme(colors.primary/10%),transparent)]"></div>

  <div class="container mx-auto px-6 py-16 sm:py-24">
    <div class="mx-auto max-w-2xl text-center">
      <div class="mb-4 flex items-center justify-center gap-3 text-muted-foreground">
        <Avatar class="h-9 w-9 ring-2 ring-primary/20">
          <AvatarImage src={faviconSvg} alt="App" />
          <AvatarFallback>HW</AvatarFallback>
        </Avatar>
        <span class="text-sm font-medium tracking-wide">SvelteKit + shadcn/ui</span>
      </div>

      <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">
        Hello, World
        <span class="ml-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Beautifully</span>
      </h1>
      <p class="mt-4 text-lg text-muted-foreground">
        A minimal, elegant starter powered by Svelte 5, Tailwind CSS, and shadcn/ui-svelte.
      </p>

      <div class="mt-8 grid place-items-center">
        <Card class="w-full max-w-xl border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
            <CardDescription>
              Explore the components and build something delightful.
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <p>
              This page uses <code class="rounded bg-muted px-1 py-0.5 text-sm">Button</code>,
              <code class="rounded bg-muted px-1 py-0.5 text-sm">Card</code>,
              <code class="rounded bg-muted px-1 py-0.5 text-sm">Avatar</code> and
              <code class="rounded bg-muted px-1 py-0.5 text-sm">Separator</code> from shadcn/ui.
            </p>
            <Separator />
            <div class="flex flex-wrap items-center gap-3">
              <Button on:click={onPrimary} class="gap-2">
                🎉 Say Hello
              </Button>
              <Button variant="secondary" on:click={onSecondary} class="gap-2">
                📖 Read Docs
              </Button>
              <Button variant="outline" asChild>
                <a href="https://ui.shadcn.com/" target="_blank" rel="noreferrer">Browse shadcn/ui</a>
              </Button>
              <Button asChild>
                <a href="/todos">Open Todos →</a>
              </Button>
              <Button variant="secondary" asChild>
                <a href="/lessons">Book a Lesson →</a>
              </Button>
            </div>
          </CardContent>
          <CardFooter class="justify-between text-sm text-muted-foreground">
            <span>Svelte 5 • SvelteKit</span>
            <span>Tailwind CSS • shadcn/ui</span>
          </CardFooter>
        </Card>
      </div>
    </div>
  </div>
</section>

<section class="container mx-auto px-6 pb-24">
  <div class="mx-auto max-w-3xl rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <p>
      Edit <code class="rounded bg-muted px-1 py-0.5">src/routes/+page.svelte</code> to customize your landing
      page. The global styles live in <code class="rounded bg-muted px-1 py-0.5">src/app.css</code>.
    </p>
  </div>
</section>

