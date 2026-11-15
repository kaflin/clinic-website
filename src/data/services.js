'use strict';

/*
  Treatments. One entry per treatment, one page per entry: /services/<slug>.

  The text is general patient information written in plain language. A doctor
  at the clinic must read, correct and approve each page before launch, then
  fill in `reviewedBy` and `reviewedOn` for that page. Remove anything the
  clinic does not offer.

  name      the title in menus and lists
  short     the small note beside the title in the home page list
  heading   the page's <h1>. It carries the main search term for the page.
  summary   the meta description, about 155 characters
*/

const review = { reviewedBy: null, reviewedOn: null };

module.exports = [
  {
    slug: 'knee-hip-replacement',
    name: 'Knee and hip replacement',
    short: 'Total and partial',
    heading: 'Knee and hip replacement surgery',
    summary: 'When a worn knee or hip stops you walking, sleeping or working, a joint replacement can help. What the operation involves and how recovery goes.',
    review: { ...review },
    intro: [
      'A joint replacement is an operation that removes the worn surfaces of a knee or hip and fits smooth metal and plastic parts in their place. The new parts glide against each other the way healthy cartilage once did.',
      'Most people who need one have osteoarthritis, which is the slow wearing away of the cartilage that cushions the ends of the bones. An old injury, rheumatoid arthritis or a hip that lost its blood supply can lead to the same damage.',
    ],
    symptoms: [
      'Pain in the knee, groin or thigh that is there most days',
      'Pain that wakes you at night or stays when you rest',
      'Stiffness that makes it hard to climb stairs, squat or get up from a chair',
      'A knee that has bowed inwards or outwards',
      'Needing painkillers every day to get through ordinary tasks',
    ],
    treatment: [
      'We don\'t start with surgery. Exercises, weight loss, a walking stick, medicine and sometimes an injection into the joint come first, and for many people they are enough.',
      'If the pain still rules your day and your X-ray shows the joint has worn out, we\'ll talk to you about replacing it. In a total replacement the whole joint surface is replaced. In a partial knee replacement only the damaged side is replaced, which suits some patients whose wear is limited to one part of the knee.',
      'Before the operation you\'ll have blood tests, a heart check and a meeting with the anaesthetist, the doctor who keeps you asleep or numb during surgery. The operation usually takes one to two hours.',
    ],
    recovery: [
      'Most patients stand and take a few steps with a walker within a day or two. A physiotherapist shows you the exercises and you carry on with them at home.',
      'You\'ll likely use a walker or stick for a few weeks. Many people go back to desk work in six to eight weeks. Strength and confidence keep improving for six months or more. How fast you recover depends on your age, your general health and how regularly you do your exercises.',
      'Every operation has risks, including infection, blood clots and stiffness. We\'ll go through them with you before you decide.',
    ],
    whenToSee: [
      'Knee or hip pain has lasted more than a few weeks and isn\'t easing',
      'Pain keeps you awake or stops you walking as far as you used to',
      'The joint locks, gives way or has changed shape',
      'A replaced joint becomes red, hot or swollen, or you get a fever. See a doctor the same day.',
    ],
  },
  {
    slug: 'spine-surgery',
    name: 'Spine surgery',
    short: 'Disc, stenosis, deformity',
    heading: 'Spine surgery and back pain treatment',
    summary: 'Back and neck pain, slipped disc, sciatica and spinal stenosis. Most cases settle without an operation. When surgery helps and what recovery is like.',
    review: { ...review },
    intro: [
      'Your spine is a column of bones called vertebrae, with a soft disc between each pair that works as a cushion. The spinal cord and the nerves to your arms and legs run through the middle.',
      'A slipped disc is a disc that has bulged out and is pressing on a nerve. Spinal stenosis is a narrowing of the space around the nerves, common as we get older. A deformity is a spine that curves to the side or forwards more than it should. Any of these can cause pain in the back or neck, or pain that travels down an arm or leg.',
    ],
    symptoms: [
      'Back or neck pain that lasts more than a few weeks',
      'Pain that shoots down the leg, often called sciatica',
      'Numbness, tingling or weakness in an arm or leg',
      'Leg pain or heaviness when you walk that eases when you sit',
      'A visible curve in the back, or uneven shoulders',
    ],
    treatment: [
      'Most back pain gets better without an operation. Staying active, a short course of medicine and physiotherapy settle the large majority of cases within six weeks.',
      'We examine your strength, feeling and reflexes, and may ask for an X-ray or an MRI scan, which shows the discs and nerves in detail.',
      'Surgery is for the smaller group whose nerve is being squeezed and who are not improving, or who are getting weaker. Common operations are a discectomy, which removes the piece of disc pressing on the nerve, a decompression, which makes more room for the nerves, and a fusion, which joins two vertebrae with screws and bone graft so they stop moving painfully.',
    ],
    recovery: [
      'After a discectomy or decompression most people walk the same day or the next and go home within a few days. Light work is often possible after two to six weeks.',
      'A fusion takes longer. The bones need about three months to join, and you\'ll avoid heavy lifting and bending during that time. Physiotherapy rebuilds the muscles that support your spine.',
      'Spine surgery carries risks such as infection, bleeding and injury to a nerve. We\'ll explain how they apply to you before you decide.',
    ],
    whenToSee: [
      'Back or neck pain hasn\'t improved after a few weeks',
      'Pain, numbness or tingling runs down an arm or leg',
      'A leg or foot feels weak, or your foot drags',
      'You lose control of your bladder or bowel, or go numb around the groin. This is an emergency. Go to hospital at once.',
      'Back pain follows a fall or accident, or comes with fever or weight loss',
    ],
  },
  {
    slug: 'fracture-care',
    name: 'Fracture and trauma care',
    short: 'Adults and children',
    heading: 'Fracture and trauma care',
    summary: 'Broken bones in adults and children: plaster casts, fracture surgery with plates and rods, and follow-up until the bone has healed.',
    review: { ...review },
    intro: [
      'A fracture is a broken bone. It can be a thin crack or a break in several pieces, and it can happen in a fall at home, a road accident or on the sports field.',
      'Children\'s bones are still growing and break differently from adult bones. They also heal faster. Older adults with osteoporosis, which is thinning of the bones, can break a wrist, hip or spine from a minor fall.',
    ],
    symptoms: [
      'Sudden pain after a fall or a blow',
      'Swelling and bruising that comes up quickly',
      'A limb that looks bent, shorter or out of place',
      'Not being able to put weight on a leg or use an arm',
      'A child who won\'t use an arm or refuses to walk after a fall',
    ],
    treatment: [
      'We start with an examination and an X-ray to see exactly where and how the bone has broken.',
      'Many fractures heal well in a plaster cast or a splint. If the pieces have moved, we may need to set them back in line under anaesthetic, so you feel no pain, before the cast goes on.',
      'Some fractures heal better with an operation. The surgeon lines up the pieces and holds them with a metal plate and screws, a rod inside the bone, or wires. Fixing the bone firmly often lets you move the nearby joints sooner. A broken hip in an older person is nearly always treated with surgery so they can get out of bed quickly.',
    ],
    recovery: [
      'Most fractures take six to twelve weeks to heal. Children are usually quicker. Smoking, diabetes and poor diet all slow healing down.',
      'We\'ll see you for check X-rays to make sure the bone stays in position. After the cast comes off, the limb is stiff and weak for a while, and exercises bring it back.',
      'Keep a cast dry, raise the limb in the first few days to bring down swelling, and never push anything inside the cast to scratch.',
    ],
    whenToSee: [
      'You think a bone might be broken. An early X-ray makes treatment simpler.',
      'Bone is showing through the skin, or the limb is badly bent. Go to emergency now.',
      'Fingers or toes below an injury or a cast turn pale, blue, numb or very painful. This is urgent.',
      'Pain or swelling gets worse instead of better while in a cast',
      'A cast is cracked, loose or wet',
    ],
  },
  {
    slug: 'arthroscopy',
    name: 'Arthroscopy',
    short: 'Knee and shoulder',
    heading: 'Arthroscopy and sports injury treatment',
    summary: 'Keyhole surgery for knee and shoulder injuries: torn ligaments, cartilage tears and repeated shoulder dislocation. How it works and how long recovery takes.',
    review: { ...review },
    intro: [
      'Arthroscopy is keyhole surgery on a joint. The surgeon makes two or three cuts, each about the width of a fingernail, and passes in a thin camera and fine instruments. The inside of the joint shows on a screen, and the repair is done without opening the joint fully.',
      'It is used most for sports injuries of the knee and shoulder. In the knee that often means a torn meniscus, the rubbery cartilage pad that absorbs shock, or a torn anterior cruciate ligament (ACL), one of the main ligaments that keeps the knee steady. In the shoulder it is used for a shoulder that keeps dislocating and for tears of the rotator cuff, the group of tendons that lift the arm.',
    ],
    symptoms: [
      'A pop or sudden pain in the knee during a twist, jump or tackle',
      'A knee that swells within hours of an injury',
      'A knee that gives way, locks or catches',
      'A shoulder that has come out of joint more than once',
      'Shoulder pain when you lift your arm, or at night when you lie on it',
    ],
    treatment: [
      'Not every sports injury needs an operation. Sprains, strains and many small tears heal with rest, ice, a brace and physiotherapy.',
      'We examine the joint and usually ask for an MRI scan, which shows ligaments, cartilage and tendons clearly.',
      'If surgery is the better option, a torn meniscus is either stitched or trimmed. A torn ACL can\'t be stitched back, so it is rebuilt with a piece of tendon taken from your own leg. A shoulder that keeps dislocating is tightened by repairing the torn rim of the socket. Most arthroscopies are done as a day case or with one night in hospital.',
    ],
    recovery: [
      'Because the cuts are small, there is less pain and swelling than after open surgery. You still need time for the repair inside to heal.',
      'After a simple meniscus trim, many people walk comfortably within a couple of weeks. After an ACL rebuild, running usually starts at around three months, and a return to contact sport often takes nine months or more. Shoulder repairs need a sling for a few weeks.',
      'Physiotherapy is a large part of the result. We\'ll give you a plan with stages, and you move to the next stage when the joint is ready.',
    ],
    whenToSee: [
      'A joint swells quickly after an injury',
      'Your knee gives way, locks, or won\'t straighten fully',
      'Your shoulder has dislocated, even if it went back by itself',
      'Pain from a sports injury hasn\'t settled after two weeks of rest',
      'You can\'t put weight on the leg after a twist or fall',
    ],
  },
  {
    slug: 'arthritis',
    name: 'Arthritis management',
    short: 'Medical and surgical',
    heading: 'Arthritis treatment',
    summary: 'Joint pain and stiffness from osteoarthritis or rheumatoid arthritis. Exercise, medicine, injections and, when needed, surgery to keep you moving.',
    review: { ...review },
    intro: [
      'Arthritis means a joint that is painful, stiff and often swollen. There are many types. The two we see most are osteoarthritis and rheumatoid arthritis.',
      'Osteoarthritis is wear of the cartilage, the smooth layer that covers the ends of the bones. It comes on slowly, mostly after the age of fifty, and affects knees, hips, hands and the spine. Rheumatoid arthritis is different. The body\'s own defence system attacks the lining of the joints, and it can start at any age. Gout, caused by crystals of uric acid in a joint, is another common type.',
    ],
    symptoms: [
      'Joint pain that is worse after activity or at the end of the day',
      'Stiffness in the morning or after sitting for a while',
      'Swelling around a joint',
      'A grating or creaking feeling when the joint moves',
      'Finger joints that are swollen and stiff on both hands for more than an hour each morning',
    ],
    treatment: [
      'Arthritis can\'t be reversed, but it can be managed so that you stay active. We start by finding out which type you have, using an examination, X-rays and sometimes blood tests.',
      'For osteoarthritis the most useful steps are regular exercise to strengthen the muscles around the joint, losing weight if you are heavy, and painkillers when you need them. A knee support or a walking stick can take load off the joint. An injection into the joint may ease a bad flare for some weeks.',
      'Rheumatoid arthritis needs medicines that calm the immune system, and it should be treated early to protect the joints. For gout, medicine and changes to diet bring the uric acid down.',
      'When a joint is badly worn and other treatment no longer helps, we\'ll discuss surgery, including joint replacement.',
    ],
    recovery: [
      'Living with arthritis is about steady habits. Keep moving, because joints that rest too much get stiffer. Walking, cycling and swimming are easy on the joints.',
      'Flares come and go. Rest the joint for a day or two when it flares, then start moving again. We\'ll review you from time to time to check the joint and adjust your medicine.',
    ],
    whenToSee: [
      'Joint pain or stiffness has lasted more than a few weeks',
      'Several joints are swollen, or your hands are stiff for over an hour every morning',
      'A single joint suddenly becomes hot, red and very painful. If you also have a fever, see a doctor the same day.',
      'Pain stops you sleeping or doing ordinary things',
      'Painkillers that used to work have stopped helping',
    ],
  },
  {
    slug: 'physiotherapy',
    name: 'Physiotherapy',
    short: 'Post-operative rehabilitation',
    heading: 'Physiotherapy and rehabilitation',
    summary: 'Guided exercises to get movement and strength back after surgery, a fracture or a sports injury, and to ease back, neck and joint pain.',
    review: { ...review },
    intro: [
      'Physiotherapy is treatment through movement. A physiotherapist checks how your joints and muscles are working, then teaches you exercises and uses hands-on techniques to bring back movement, strength and balance.',
      'After an operation or a fracture, muscles weaken quickly and joints stiffen. Rehabilitation is the planned work of getting them back. For many problems, such as back pain, neck pain and early arthritis, physiotherapy is the main treatment and surgery is never needed.',
    ],
    symptoms: [
      'Stiffness or weakness after a cast comes off',
      'Trouble bending or straightening a joint after surgery',
      'Back or neck pain that keeps returning',
      'A limp, poor balance or fear of falling',
      'A sports injury that hasn\'t fully settled',
    ],
    treatment: [
      'Your first session is an assessment. The physiotherapist asks what you can and can\'t do, looks at how you move, and reads your surgeon\'s notes if you\'ve had an operation.',
      'You then get a set of exercises matched to your stage of healing. Early on these are gentle movements to stop stiffness. Later they build strength, and then balance and the specific movements your work or sport needs.',
      'Treatment may also include stretching and moving the joint by hand, walking practice with a walker or stick, heat or ice for pain, and advice on posture and lifting.',
    ],
    recovery: [
      'How many sessions you need depends on the problem. A stiff wrist after a cast may need a few weeks. A knee replacement or ligament repair usually needs three months or more.',
      'What you do at home matters more than what happens in the session. Ten to fifteen minutes of exercises, two or three times a day, works better than one long session a week.',
      'Some soreness after exercise is normal. Sharp pain or new swelling isn\'t, so tell your physiotherapist and we\'ll adjust the plan.',
    ],
    whenToSee: [
      'A joint is still stiff or weak weeks after an injury or operation',
      'Pain comes back each time you return to work or sport',
      'You\'ve fallen, or feel unsteady on your feet',
      'Your surgeon has asked you to start rehabilitation',
      'Pain, numbness or swelling gets worse with exercise. Stop and see a doctor.',
    ],
  },
];
