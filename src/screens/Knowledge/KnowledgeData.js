import img1 from "../../images/knowledgePicture/พริกป่น.jpg";
import img2 from "../../images/knowledgePicture/protein.jpg";
import img3 from "../../images/knowledgePicture/cabohydrate.jpg";
import img4 from "../../images/knowledgePicture/vegetable.jpg";
import img5 from "../../images/knowledgePicture/fruit.jpg";
import img6 from "../../images/knowledgePicture/kaiman.jpg";
import img7 from "../../images/knowledgePicture/onion.jpg";
import img8 from "../../images/knowledgePicture/greenTea.jpg";
let dataArray = [
  {
    id_kn: 1,
    topic: "พริกป่น",
    photoPlace: img1,
    data1_: [
      "พริกมีอยู่หลายชนิดด้วยกัน นอกจากจะรับประทานแบบสดๆแล้วยังนำมาทำเป็นพริกป่นเก็บไว้กินได้อีกด้วย",
      "พริกป่นที่หลายคนรู้จักไม่ได้มีประโยชน์แค่ให้ความเผ็ดกับอาหารอย่างเดียว เพราะในพริกป่นมีคุณสมบัติที่ช่วยกำจัดเซลล์มะเร็งได้โดยไม่ทำลายเซลล์ดีๆในร่างกาย ",
      "นอกจากนั้นแล้วคนที่ต้องนั่งหรือยืนทำงานเป็นเวลานานๆควรรับประทานพริกป่น",
      " เพราะจะช่วยบรรเทาอาการปวดกล้ามเนื้อหลังได้ดีเลยทีเดียว",
    ],
  },
  {
    id_kn: 2,
    topic: "อาหารหมู่ที่ 1 โปรตีน ",
    photoPlace: img2,
    data1_: [
      "อาหารหลักหมู่ที่ 1 คือ อาหารประเภทโปรตีนที่ได้จากเนื้อสัตว์ เช่น เนื้อหมู เนื้อไก่ เนื้อปลา นม ไข่ ถั่วเมล็ดแห้ง ถั่วเหลือง ถั่วเขียว ถั่วแระ ถั่วดำ ถั่วลิสง",
      "ผลิตผลที่ได้จากถั่ว เช่น เต้าหู้ นมถั่วเหลือง ซึ่งโปรตีนที่มีความจำเป็นต่อการทำงานของร่างกายช่วยการเจริญเติบโตของร่างกาย สร้างกล้ามเนื้อ ฟื้นฟูกล้าม",
      "เนื้อและซ่อมแซมเนื้อเยื่อส่วนที่สึกหรอ คำแนะนำการบริโภคโปรตีนที่เหมาะสม สำหรับคนทั่วไปควรได้รับโปรตีน 1 กรัม ต่อน้ำหนักตัว 1 กิโลกรัม และคนออกกำลังกาย ควรได้รับโปรตีน 2-3 กรัม ต่อน้ำหนักตัว 1 กิโลกรัม",
    ],
  },
  {
    id_kn: 3,
    topic: "อาหารหมู่ที่ 2 คาร์โบไฮเดรต",
    photoPlace: img3,
    data1_: [
      "อาหารหลักหมู่ที่ 2 คือ อาหารประเภทคาร์โบไฮเดรตที่ได้จาก มันเทศ ควินัว ข้าวกล้อง เป็นแหล่งพลังงานหลักของระบบประสาทและสมอง เมื่อร่างกายได้",
      "รับคาร์โบไฮเดรตจะแบ่งเป็นน้ำตาลขนาดเล็ก คือ กลูโคส และฟรุกโตสที่ลำไส้เล็กสามารถดูดซึมไปใช้ได้ ซึ่งจะเข้าสู่กระแสเลือดไปยังตับ ตับจะเปลี่ยน",
      "น้ำตาลทั้งหมดเป็นกลูโคส ซึ่งไหลผ่านกระแสเลือดพร้อมกับอินซูลิน และแปลงเป็นพลังงานสำหรับการทำงานของร่างกายช่วยให้ร่างกายเผาผลาญไขมันได้",
      "อย่างมีประสิทธิภาพ คำแนะนำการบริโภคคาร์โบไฮเดรตที่เหมาะสม สำหรับคนทั่วไป ควรได้รับคาร์โบไฮเดรต 3 กรัม ต่อน้ำหนักตัว 1 กิโลกรัม และคนออก",
      "กำลังกาย ควรได้รับโปรตีน 2-3 กรัม ต่อน้ำหนักตัว 1 กิโลกรัม",
    ],
  },
  {
    id_kn: 4,
    topic: "อาหารหมู่ที่ 3 เกลือแร่หรือแร่ธาตุ",
    photoPlace: img4,
    data1_: [
      "อาหารหลักหมู่ที่ 3 ที่ได้จากผักใบสีเขียว ผักสีเหลืองเป็นแหล่งรวมเกลือแร่และแร่ธาตุแก่ร่างกาย เช่น ฟักทอง มันเทศสีเหลือง ถั่วฝักยาว ผักบุ้ง ตำลึง แครอท",
      "คะน้า แตงกวา บวบ ฟักเขียว ผักกาดขาว ช่วยให้ร่างกายเจริญเติบโต ช่วยเสริมสร้างภูมิคุ้มกันให้แข็งแรง ช่วยซ่อมแซมเซลล์ที่เสียหาย ป้องกันการบาดเจ็บของ",
      "ร่างกาย ช่วยปกป้องกระดูกแตกหัก และช่วยป้องกันฟันผุ",
    ],
  },
  {
    id_kn: 5,
    topic: "อาหารหมู่ที่ 4 วิตามิน",
    photoPlace: img5,
    data1_: [
      "อาหารหลักหมู่ที่ 4 ที่ได้จากผลไม้ชนิดต่าง ๆ อุดมไปด้วยวิตามินที่สำคัญช่วยป้องกันโรค ลดคอเลสเตอรอล ช่วยในระบบย่อยอาหาร ได้แก่ ส้มโอ ลูกพีช",
      "องุ่น เสาวรส มะละกอ กล้วย แอปเปิ้ล ส้ม ผลไม้ตระกูลเบอร์รี่ ควรกินผลไม้และผลไม้อย่างน้อยให้ถึง 400 กรัมต่อคนต่อวัน ช่วยลดความเสี่ยงในการเกิดโรคต่างๆ",
    ],
  },
  {
    id_kn: 6,
    topic: "อาหารหมู่ที่ 5 ไขมัน",
    photoPlace: img6,
    data1_: [
      "อาหารหลักหมู่ที่ 5 โดยแบ่งได้เป็น 2 ประเภท ได้แก่ ไขมันอิ่มตัว และไขมันไม่อิ่มตัว ส่วนใหญ่ไขมันที่ได้จากสัตว์ เช่น น้ำมันหมู น้ำมันไก่ น้ำมันจากวัว ครีม",
      "เนย ชีส และไขมันจากพืชบางชนิด เช่น น้ำมันปาล์ม น้ำมันมะพร้าว น้ำมันมะกอก น้ำมันงา น้ำมันถั่วเหลือง น้ำมันเมล็ดดอกทานตะวัน น้ำมันรำข้าว",
      "น้ำมันเมล็ดดอกคำฝอย น้ำมันถั่วลิสง น้ำมันปาล์ม ซึ่งเป็นแหล่งให้พลังงานและให้ความอบอุ่นแก่ร่างกาย สามารถช่วยในการดูดซึมของวิตามินบางชนิด ช่วย",
      "ป้องกันการบาดเจ็บของอวัยวะภายในร่างกาย ช่วยควบคุมอุณหภูมิของร่างกายให้คงที่ ช่วยป้องกันเส้นประสาท",
    ],
  },
  {
    id_kn: 6,
    topic: "กระเทียม หอมแดง",
    photoPlace: img7,
    data1_: [
      "นอกจากสรรพคุณของกระเทียมในเรื่องช่วยลดไขมันในเลือดแล้ว การศึกษาเมื่อปี 2006 และปี 2012 ยังพบว่า สารสกัดในกระเทียมมี",
      "ประโยชน์ในด้านลดน้ำตาลในเลือดด้วย โดยเฉพาะกับผู้ป่วยโรคเบาหวานชนิดที่ 2 สารสกัดในกระเทียมจะเข้าไปกระตุ้นการหลั่งอินซูลินใน",
      "ร่างกายผู้ป่วยได้ รวมทั้งหัวหอมและหอมแดงก็เป็นสมุนไพรที่มีสรรพคุณลดน้ำตาลในเลือดเช่นเดียวกัน",
    ],
  },
  {
    id_kn: 7,
    topic: "ชาเขียว",
    photoPlace: img8,
    data1_: [
      "ชาเขียวสามารถช่วยลดระดับน้ำตาลในเลือด",
      "แถมยังมีคุณสมบัติช่วยลดคอเลสเตอรอลในเลือดด้วย ",
      "ชาเขียวดีต่อผู้ป่วยโรคเบาหวาน ดีต่อคนที่อยากลดระดับคอเลสเตอรอล และเป็นอาหารที่ดีต่อสุขภาพของคนทุกวัยย",
    ],
  },
];
export default dataArray;
