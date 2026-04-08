// Coordinate lookup for all specific locations referenced in the dataset.
// Covers cities, counties, school districts, and states mentioned in
// banned_books_women_authors.json location fields.
export const COORDS = {
  // ── Alabama ──────────────────────────────────────────────────────────
  'Alabama': [32.3617, -86.2792],
  'Tuscaloosa, AL': [33.2098, -87.5692],

  // ── Alaska ───────────────────────────────────────────────────────────
  'Matanuska-Susitna Borough': [61.5768, -149.4058],
  'Alaska': [64.2008, -153.4937],

  // ── Arizona ──────────────────────────────────────────────────────────
  'Gilbert, AZ': [33.3528, -111.7890],
  'Arizona': [34.0489, -111.0937],

  // ── California ───────────────────────────────────────────────────────
  'California': [36.7783, -119.4179],
  'Oakland, CA': [37.8044, -122.2712],
  'Colton, CA': [34.0739, -117.3131],

  // ── Florida ──────────────────────────────────────────────────────────
  'Florida': [27.9944, -81.7603],
  'Polk County, FL': [28.0395, -81.9498],
  'Pinellas County, FL': [27.8765, -82.7779],
  'Martin County, FL': [27.0777, -80.3664],
  'Flagler County, FL': [29.4729, -81.2799],
  'Clay County, FL': [30.0294, -81.7682],
  'Collier County, FL': [26.1224, -81.4001],

  // ── Georgia ──────────────────────────────────────────────────────────
  'Georgia': [32.1656, -82.9001],
  'Gwinnett County, GA': [33.9609, -84.0022],

  // ── Idaho ────────────────────────────────────────────────────────────
  'Idaho': [44.0682, -114.7420],

  // ── Illinois ─────────────────────────────────────────────────────────
  'Illinois': [40.6331, -89.3985],
  'Chicago, IL': [41.8781, -87.6298],
  'Waukegan, IL': [42.3636, -87.8448],

  // ── Indiana ──────────────────────────────────────────────────────────
  'Indiana': [40.2672, -86.1349],
  'Warren, IN': [40.6823, -85.4264],

  // ── Iowa ─────────────────────────────────────────────────────────────
  'Iowa': [41.8780, -93.0977],

  // ── Kansas ───────────────────────────────────────────────────────────
  'Kansas': [38.5266, -96.7265],
  'Goddard, KS': [37.6614, -97.5689],

  // ── Kentucky ─────────────────────────────────────────────────────────
  'Louisville, KY': [38.2527, -85.7585],
  'Kentucky': [37.8393, -84.2700],

  // ── Louisiana ────────────────────────────────────────────────────────
  'Louisiana': [30.9843, -91.9623],

  // ── Michigan ─────────────────────────────────────────────────────────
  'Michigan': [44.3148, -85.6024],
  'Plymouth Canton, MI': [42.3714, -83.4724],

  // ── Minnesota ────────────────────────────────────────────────────────
  'Minnesota': [46.7296, -94.6859],
  'Zimmerman, MN': [45.4427, -93.5907],
  'Anoka-Hennepin': [45.1978, -93.3866],
  'Edgerton, MN': [43.8721, -96.1303],
  'Eden Valley, MN': [45.3302, -94.5496],
  'Duluth, MN': [46.7867, -92.1005],

  // ── Mississippi ──────────────────────────────────────────────────────
  'Mississippi': [32.3547, -89.3985],
  'Rankin County, MS': [32.2735, -89.9484],

  // ── Missouri ─────────────────────────────────────────────────────────
  'Missouri': [38.5767, -92.1735],
  'Wentzville, MO': [38.8114, -90.8529],
  'Republic, MO': [37.1220, -93.4796],

  // ── New Hampshire ────────────────────────────────────────────────────
  'Goffstown, NH': [43.0165, -71.5920],

  // ── New Mexico ───────────────────────────────────────────────────────
  'Alamogordo, NM': [32.8995, -105.9603],

  // ── North Carolina ───────────────────────────────────────────────────
  'North Carolina': [35.7596, -79.0193],
  'Guilford County, NC': [36.0726, -79.7920],
  'Buncombe County, NC': [35.5951, -82.5515],
  'Morgantown, NC': [35.7379, -81.6773],

  // ── Ohio ─────────────────────────────────────────────────────────────
  'Ohio': [40.4173, -82.9071],
  'Rocky River, OH': [41.4773, -81.8440],

  // ── Pennsylvania ─────────────────────────────────────────────────────
  'Pennsylvania': [41.2033, -77.1945],
  'Upper Moreland, PA': [40.1434, -75.1129],
  'Lehighton, PA': [40.8334, -75.7135],
  'Souderton, PA': [40.3137, -75.3232],

  // ── South Carolina ───────────────────────────────────────────────────
  'South Carolina': [33.8361, -81.1637],
  'College of Charleston, SC': [32.7765, -79.9311],

  // ── Tennessee ────────────────────────────────────────────────────────
  'Tennessee': [35.5175, -86.5804],
  'Nashville, TN': [36.1627, -86.7816],

  // ── Texas ────────────────────────────────────────────────────────────
  'Texas': [31.9686, -99.9018],
  'Judson, TX': [29.5302, -98.3064],
  'Katy, TX': [29.7858, -95.8245],
  'Katy ISD, TX': [29.7858, -95.8245],
  'Rockwall, TX': [32.9299, -96.4597],
  'Cleveland, TX': [30.3438, -95.0899],

  // ── Utah ─────────────────────────────────────────────────────────────
  'Utah': [39.3210, -111.0937],
  'Magna, UT': [40.7091, -112.1013],

  // ── Virginia ─────────────────────────────────────────────────────────
  'Virginia': [37.4316, -78.6569],
  'Spotsylvania County, VA': [38.1851, -77.6583],
  'Bedford County, VA': [37.3271, -79.5228],
  'Madison County, VA': [38.4079, -78.2717],
  'Hanover County, VA': [37.7632, -77.4119],
  'Newport News, VA': [37.0871, -76.4730],
}

// Aliases: map messy strings -> canonical lookup keys
export const ALIASES = {
  'Alabama State Textbook Committee': 'Alabama',
  'Matanuska-Susitna Borough School District': 'Matanuska-Susitna Borough',
  'Matanuska-Susitna Borough, AK': 'Matanuska-Susitna Borough',
  'Matanuska-Susitna Borough School District, AK': 'Matanuska-Susitna Borough',
  'Katy Independent School District, TX': 'Katy ISD, TX',
  'Katy ISD': 'Katy, TX',
  'Edgerton Public Schools, MN': 'Edgerton, MN',
  'Collier County Public Schools, FL': 'Collier County, FL',
  'Buncombe County Schools, NC': 'Buncombe County, NC',
  'Rockwall ISD, TX': 'Rockwall, TX',
  'Rockwall ISD': 'Rockwall, TX',
  'Lehighton Area School District, PA': 'Lehighton, PA',
  'Lehighton Area School District': 'Lehighton, PA',
  'Anoka-Hennepin School District, MN': 'Anoka-Hennepin',
  'Anoka-Hennepin School District': 'Anoka-Hennepin',
  'Chicago Public Schools, IL': 'Chicago, IL',
  'Chicago Public Schools': 'Chicago, IL',
  'College of Charleston, SC': 'College of Charleston, SC',
  'Upper Moreland, PA': 'Upper Moreland, PA',
  'Morgantown, NC': 'Morgantown, NC',
  'St. Edward School, Nashville, TN': 'Nashville, TN',
  'Brockbank Junior High, Magna, UT': 'Magna, UT',
  'Austin Memorial Library, Cleveland, TX': 'Cleveland, TX',
  'Virginia State Senate': 'Virginia',
  'Eastern High School': 'Louisville, KY',
  'Alamogordo, NM (book burning, 2001)': 'Alamogordo, NM',
}
