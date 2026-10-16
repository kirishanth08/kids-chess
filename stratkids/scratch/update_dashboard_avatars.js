const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'parent-dashboard');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(f => {
  const p = path.join(dir, f);
  let content = fs.readFileSync(p, 'utf8');
  if (content.includes('<div class="dash-avatar-circle">S</div>')) {
    content = content.replace(
      '<div class="dash-avatar-circle">S</div>',
      '<img src="../assets/images/guardian_sarah_vance.jpg" alt="Sarah Vance" class="dash-avatar-img">'
    );
    fs.writeFileSync(p, content, 'utf8');
    console.log('Updated avatar in:', f);
  }
});

// Also update the profile page main avatar
const profilePath = path.join(dir, 'profile.html');
let profileContent = fs.readFileSync(profilePath, 'utf8');
const oldProfileAvatarRegex = /<div class="dash-avatar-circle"[^>]*style="[^"]*width:\s*70px[^"]*"[^>]*>\s*S\s*<\/div>/;
if (oldProfileAvatarRegex.test(profileContent)) {
  profileContent = profileContent.replace(
    oldProfileAvatarRegex,
    '<img src="../assets/images/guardian_sarah_vance.jpg" alt="Sarah Vance" class="dash-avatar-img shadow-sm" style="width: 70px; height: 70px; border-width: 3px;">'
  );
  fs.writeFileSync(profilePath, profileContent, 'utf8');
  console.log('Updated main profile avatar in profile.html');
}
