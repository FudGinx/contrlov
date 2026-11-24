#!/usr/bin/env python3
"""Сводка по выгруженным партиям «Корінь розбрату».
Использование:  python3 analyze-games.py папка_с_json [--humans]
Берёт все файлы koren-*.json (кнопка «Аналітика партії (JSON)» после матча)
и считает проценты побед: персонажи, поляны (кто пользовался), карты (кто варил).
--humans — считать только живых игроков (боты остаются соперниками).
"""
import json,sys,glob,os,collections,math
args=[a for a in sys.argv[1:] if not a.startswith('--')];only_h='--humans' in sys.argv
folder=args[0] if args else '.'
files=sorted(glob.glob(os.path.join(folder,'*.json')))
games=[]
for f in files:
    try:
        d=json.load(open(f,encoding='utf-8'))
        if d.get('format')=='koren-analytics' and d.get('finishedAt'):games.append(d)
    except Exception as e:print('пропущен',f,e)
if not games:sys.exit('Нет файлов аналитики в '+folder)
P=[]
for g in games:
    win=[p for p in g['players'] if p.get('winner')]
    for p in g['players']:
        if only_h and p.get('bot'):continue
        p['_w']=(1/len(win)) if p in win else 0;P.append((g,p))
n=len(games);exp=sum(1/len(g['players']) for g,_ in P)/max(1,len(P))*100
print(f"Партий: {n}. Игроков в выборке: {len(P)}{' (только люди)' if only_h else ''}. Ожидаемый процент побед: {exp:.1f}%")
print('Пометка ▲/▼ ставится, только если отклонение больше 5 п.п. и больше погрешности (±).')
print(f"Средняя слава {sum(p['score'] for _,p in P)/len(P):.1f}; длительность {sum(g.get('durationSec',0) for g in games)/n/60:.1f} мин; кругов {sum(g.get('rounds',0) for g in games)/n:.1f}")
CARD={'p1':'Простий +1','p2':'Простий +2','p3':'Простий +3','draw':'Добір','sift':'Просіювання 5→1','recover':'Зі скиду','extra':'Ще одне','stoke':'Жар','rebrew':'Переварка','brew-wild':'Універсальний','echo':'Відлуння','amplify':'Підсилення ×2','resonance':'Резонанс','cancel':'Оберіг','distill':'Дистиляція'}
def table(title,rows):
    print('\n'+title)
    for name,m,w,extra in sorted(rows,key=lambda r:-r[2]/max(1,r[1])):
        x=w/max(1,m)*100;se=math.sqrt(max(exp/100*(1-exp/100),1e-9)/max(1,m))*200
        mark='' if abs(x-exp)<=max(5,se) else (' ▲ выше нормы' if x>exp else ' ▼ ниже нормы')
        print(f"  {CARD.get(name,name):28s} {x:5.1f}%  (n={m}, ±{se:.0f}){extra}{mark}")
ch=collections.defaultdict(lambda:[0,0.0,0])
for g,p in P:c=ch[p.get('characterName') or p.get('character')];c[0]+=1;c[1]+=p['_w'];c[2]+=p['score']
table('ПЕРСОНАЖИ',[(k,m,w,f'  слава {sc/m:.1f}') for k,(m,w,sc) in ch.items()])
hx=collections.defaultdict(lambda:[0,0.0,0])
for g,p in P:
    for k,v in p.get('hexUse',{}).items():h=hx[k.split(':',1)[1]+(' (оборот)' if k.split(':')[0].endswith('B') else '')];h[0]+=1;h[1]+=p['_w'];h[2]+=v
    if p.get('hideoutFinds'):h=hx['Мохова схованка (оборот)'];h[0]+=1;h[1]+=p['_w'];h[2]+=p['hideoutFinds']
table('ПОЛЯНЫ (победы тех, кто пользовался)',[(k,m,w,f'  использований {u}') for k,(m,w,u) in hx.items()])
cd=collections.defaultdict(lambda:[0,0.0,0])
for g,p in P:
    for k,v in p.get('plays',{}).items():c=cd[k];c[0]+=1;c[1]+=p['_w'];c[2]+=v
    for k,v in p.get('whites',{}).items():c=cd[k];c[0]+=1;c[1]+=p['_w'];c[2]+=v
table('КАРТЫ (победы тех, кто сварил/сыграл)',[(k,m,w,f'  розыгрышей {u}') for k,(m,w,u) in cd.items()])
sb=collections.defaultdict(lambda:[0,0.0,0])
for g,p in P:
    for k,v in p.get('sabotage',{}).items():c=sb[k];c[0]+=1;c[1]+=p['_w'];c[2]+=v
table('САБОТАЖ (победы тех, кто подкидывал)',[(k,m,w,f'  подкидываний {u}') for k,(m,w,u) in sb.items()])
seat=collections.defaultdict(lambda:[0,0.0])
for g,p in P:s=seat[p['seat']+1];s[0]+=1;s[1]+=p['_w']
print('\nМЕСТА ЗА СТОЛОМ: '+', '.join(f"{k}: {w/m*100:.0f}%" for k,(m,w) in sorted(seat.items())))
