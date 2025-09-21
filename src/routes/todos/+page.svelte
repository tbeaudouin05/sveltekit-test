<script lang="ts">
  let { data } = $props();
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Label } from '$lib/components/ui/label';
  import { Badge } from '$lib/components/ui/badge';
  import { Separator } from '$lib/components/ui/separator';
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';

  const remaining = () => data.todos.filter((t: any) => !t.completed).length;
</script>

<section class="container mx-auto max-w-3xl px-6 py-10">
  <div class="mb-8 text-center">
    <h1 class="text-4xl font-bold tracking-tight">Todos</h1>
    <p class="mt-2 text-muted-foreground">Server-side actions with SvelteKit</p>
  </div>

  <Card class="border-border/60">
    <CardHeader>
      <CardTitle>Add a new task</CardTitle>
      <CardDescription>Create a task and manage it below.</CardDescription>
    </CardHeader>
    <CardContent>
      <form method="POST" action="?/add" class="flex gap-3">
        <Input name="title" placeholder="What needs to be done?" class="flex-1" required />
        <Button type="submit">Add</Button>
      </form>
    </CardContent>
    <CardFooter class="justify-between text-sm text-muted-foreground">
      <div class="flex items-center gap-2">
        <Badge variant={remaining() === 0 ? 'secondary' : 'default'}>{remaining()} remaining</Badge>
        <Separator orientation="vertical" class="mx-1 h-4" />
        <span>{data.todos.length} total</span>
      </div>
      <form method="POST" action="?/clearCompleted">
        <Button type="submit" variant="outline" disabled={data.todos.every((t: any) => !t.completed)}>
          Clear completed
        </Button>
      </form>
    </CardFooter>
  </Card>

  <div class="mt-8 space-y-2">
    {#if data.todos.length === 0}
      <p class="text-center text-muted-foreground">No todos yet. Add your first one above!</p>
    {:else}
      {#each data.todos as todo (todo.id)}
        <div class="flex items-center justify-between rounded-lg border bg-card p-3 text-card-foreground">
          <div class="flex items-center gap-3">
            <form method="POST" action="?/toggle" class="flex items-center gap-2">
              <input type="hidden" name="id" value={todo.id} />
              <input type="checkbox" checked={todo.completed} aria-readonly="true" disabled />
              <Button type="submit" variant="ghost" size="sm" aria-label="Toggle">Toggle</Button>
            </form>
            <Label class={todo.completed ? 'line-through text-muted-foreground' : ''}>{todo.title}</Label>
          </div>
          <form method="POST" action="?/delete">
            <input type="hidden" name="id" value={todo.id} />
            <Button type="submit" variant="ghost">Delete</Button>
          </form>
        </div>
      {/each}
    {/if}
  </div>
</section>
