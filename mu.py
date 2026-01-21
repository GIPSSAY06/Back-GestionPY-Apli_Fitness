from rich import print
from time import sleep
def printSong():
    lines = [
        ("The late afternoon, the ghost in your room", 0.07),
        ("That you always thought didn't approve", 0.08),
        ("Of you knockin' boots", 0.08),
        ("Never stopped you lettin' me get hold", 0.08),
        ("Of the sweet spot by the scruff of your", 0.07),
        ("Knee socks", 0.1),
        ]
    delays = [0.2, 0.2, 0.3, 0.2, 0.2, 0.6, 1]
    colors = ["plum4"]
    for i, (line, words_delay) in enumerate(lines):
        color = colors[i % len(colors)]
        for words in line:
            print(f"[bold {color}]{words}[/bold {color}]", end='', flush=True)
            sleep(words_delay)
            print()
            sleep(delays[i])
            printSong()