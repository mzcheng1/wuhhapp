const tabs = [...document.querySelectorAll('.tab')];
const views = {feed: document.querySelector('#feed-view'), chat: document.querySelector('#chat-view'), videos: document.querySelector('#videos-view')};
tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(item => item.classList.toggle('active', item === tab));
  Object.entries(views).forEach(([name, view]) => view.classList.toggle('hidden', name !== tab.dataset.view));
}));
const dialog = document.querySelector('#post-dialog');
document.querySelector('#new-post').onclick = () => dialog.showModal();
document.querySelector('#compose-prompt').onclick = () => dialog.showModal();
document.querySelector('.close').onclick = () => dialog.close();
document.querySelector('#publish-post').addEventListener('click', event => {
  event.preventDefault();
  const text = document.querySelector('#post-text').value.trim();
  if (!text) return toast('Write something first');
  const card = document.createElement('article'); card.className = 'post-card';
  const head = document.createElement('div'); head.className = 'post-head';
  const avatar = document.createElement('div'); avatar.className = 'mini-avatar coral'; avatar.textContent = 'J';
  const identity = document.createElement('div'); identity.innerHTML = '<strong>You</strong><span>Just now</span>';
  head.append(avatar, identity);
  const body = document.createElement('p'); body.textContent = text;
  const actions = document.createElement('div'); actions.className = 'post-actions'; actions.innerHTML = '<button class="react">♡ <span>0</span></button><button class="comment">☰ <span>0 replies</span></button><button class="share">↗</button>';
  card.append(head, body, actions); document.querySelector('#feed-view').insertBefore(card, document.querySelector('#feed-view').children[2]);
  document.querySelector('#post-text').value = ''; dialog.close(); toast('Post added to this preview');
});
document.querySelectorAll('.react').forEach(button => button.addEventListener('click', () => {button.classList.toggle('liked');button.style.color = button.classList.contains('liked') ? 'var(--orange)' : '';const count=button.querySelector('span');count.textContent=Number(count.textContent)+(button.classList.contains('liked')?1:-1)}));
document.querySelector('#chat-form').addEventListener('submit', event => {event.preventDefault();const input=document.querySelector('#chat-input');const value=input.value.trim();if(!value)return;const row=document.createElement('article');row.className='message mine';const avatar=document.createElement('div');avatar.className='mini-avatar coral';avatar.textContent='J';const box=document.createElement('div');const meta=document.createElement('div');meta.className='message-meta';meta.innerHTML='<strong>You</strong><time>now</time>';const message=document.createElement('p');message.textContent=value;box.append(meta,message);row.append(avatar,box);document.querySelector('.chat-list').append(row);input.value='';row.scrollIntoView({behavior:'smooth',block:'nearest'})});
document.querySelector('#upload-video').onclick = () => toast('Private video storage will be connected next');
function toast(message){const el=document.querySelector('#toast');el.textContent=message;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2200)}
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(()=>{}));
