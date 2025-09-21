<script lang="ts">
  let { data } = $props();
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Separator } from '$lib/components/ui/separator';
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Calendar } from '$lib/components/ui/calendar';
  import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from '$lib/components/ui/select';
  import type { DateValue } from '@internationalized/date';
  import { getLocalTimeZone } from '@internationalized/date';

  let selectedDate = $state<DateValue | undefined>(undefined);
  let selectedTime = $state('');
  let studentName = $state('');

  const toYmd = (d?: unknown) => {
    if (!d) return '';
    // Handle @internationalized/date DateValue
    if (typeof (d as any).toDate === 'function') {
      const js: Date = (d as any).toDate(getLocalTimeZone());
      return new Date(Date.UTC(js.getFullYear(), js.getMonth(), js.getDate())).toISOString().slice(0, 10);
    }
    // Handle native Date
    if (d instanceof Date) {
      return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString().slice(0, 10);
    }
    return '';
  };

  const times: string[] = [
    '07:00','08:00','09:00','10:00','11:00','12:00',
    '13:00','14:00','15:00','16:00','17:00','18:00'
  ];
</script>

<section class="container mx-auto max-w-3xl px-6 py-10">
  <div class="mb-8 text-center">
    <h1 class="text-4xl font-bold tracking-tight">Book a Surf Lesson</h1>
    <p class="mt-2 text-muted-foreground">Pick your preferred date and time</p>
  </div>

  <Card class="border-border/60">
    <CardHeader>
      <CardTitle>New Booking</CardTitle>
      <CardDescription>Fill in your name, select a date and time, then book.</CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
      <form method="POST" action="?/book" class="grid gap-4 sm:grid-cols-2">
        <div class="sm:col-span-2">
          <label for="studentName" class="mb-1 block text-sm font-medium">Student name</label>
          <Input id="studentName" name="studentName" bind:value={studentName} placeholder="e.g. Kelly Slater" required />
        </div>

        <div>
          <fieldset class="rounded-md border p-2">
            <legend class="px-1 text-sm font-medium">Date</legend>
            <Calendar type="single" bind:value={selectedDate} initialFocus />
          </fieldset>
          <input type="hidden" name="date" value={toYmd(selectedDate)} />
        </div>

        <div>
          <fieldset class="rounded-md">
            <legend id="timeLabel" class="mb-1 block text-sm font-medium">Time</legend>
            <div role="group" aria-labelledby="timeLabel">
              <Select bind:value={selectedTime}>
                <SelectTrigger class="w-full" aria-labelledby="timeLabel">
                  <span data-slot="select-value">{selectedTime || 'Select a time'}</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Available slots</SelectLabel>
                    {#each times as t}
                      <SelectItem value={t}>{t}</SelectItem>
                    {/each}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </fieldset>
          <input type="hidden" name="time" value={selectedTime} />
        </div>

        <div class="sm:col-span-2 flex items-center justify-between">
          <div class="text-sm text-muted-foreground">
            {#if selectedDate && selectedTime}
              Booking for <span class="font-medium">{toYmd(selectedDate)}</span> at <span class="font-medium">{selectedTime}</span>
            {:else}
              Select a date and a time
            {/if}
          </div>
          <Button type="submit" disabled={!toYmd(selectedDate) || !selectedTime || !studentName.trim()}>Book</Button>
        </div>
      </form>
    </CardContent>
    <CardFooter>
      <p class="text-sm text-muted-foreground">We’ll confirm your booking instantly.</p>
    </CardFooter>
  </Card>

  <div class="mt-10">
    <h2 class="mb-3 text-xl font-semibold">Upcoming Lessons</h2>
    <Separator class="mb-4" />
    {#if data.lessons.length === 0}
      <p class="text-muted-foreground">No bookings yet.</p>
    {:else}
      <div class="space-y-2">
        {#each data.lessons as lesson (lesson.id)}
          <div class="flex items-center justify-between rounded-lg border bg-card p-3 text-card-foreground">
            <div>
              <div class="font-medium">{lesson.studentName}</div>
              <div class="text-sm text-muted-foreground">{lesson.date} at {lesson.time}</div>
            </div>
            <form method="POST" action="?/cancel">
              <input type="hidden" name="id" value={lesson.id} />
              <Button type="submit" variant="ghost">Cancel</Button>
            </form>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>
